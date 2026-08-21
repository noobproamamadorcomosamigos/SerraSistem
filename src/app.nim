import nimview
import sqlite3_abi
import os
import json

proc validarLogin(usuario, senha: string): string =
  var banco: ptr sqlite3
  let caminhoBanco = normalizedPath(joinPath(getAppDir(), "..", "database", "user.db"))
  if sqlite3_open(caminhoBanco.cstring, addr banco) != SQLITE_OK:
    return ""
  defer:
    discard sqlite3_close(banco)

  discard sqlite3_exec(banco, """
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      cargo TEXT NOT NULL DEFAULT 'operador'
    )
  """.cstring, nil, nil, nil)

  discard sqlite3_exec(banco,
    "ALTER TABLE users ADD COLUMN cargo TEXT NOT NULL DEFAULT 'operador'",
    nil,
    nil,
    nil
  )

  discard sqlite3_exec(banco,
    "INSERT OR IGNORE INTO users (username, senha, cargo) VALUES ('admin', '123', 'administrador')",
    nil,
    nil,
    nil
  )

  var consulta: ptr sqlite3_stmt
  let sql = "SELECT cargo, username FROM users WHERE username = ? AND senha = ?"
  if sqlite3_prepare_v2(banco, sql.cstring, -1, addr consulta, nil) != SQLITE_OK:
    return ""
  defer:
    discard sqlite3_finalize(consulta)

  discard sqlite3_bind_text(consulta, 1, usuario.cstring, -1, nil)
  discard sqlite3_bind_text(consulta, 2, senha.cstring, -1, nil)
  if sqlite3_step(consulta) == SQLITE_ROW:
    return $sqlite3_column_text(consulta, 0) & "|" & $sqlite3_column_text(consulta, 1)
  ""

proc criarConta(dados: string): bool =
  var adminUsuario = ""
  var adminSenha = ""
  var novoUsuario = ""
  var novaSenha = ""
  var novoCargo = ""
  try:
    let cadastro = parseJson(dados)
    adminUsuario = cadastro["adminUsuario"].getStr()
    adminSenha = cadastro["adminSenha"].getStr()
    novoUsuario = cadastro["novoUsuario"].getStr()
    novaSenha = cadastro["novaSenha"].getStr()
    novoCargo = cadastro["novoCargo"].getStr()
  except:
    return false

  let cargosPermitidos = ["administrador", "gerente", "operador", "estoquista", "vendedor"]
  if novoUsuario.len == 0 or novaSenha.len == 0 or novoCargo notin cargosPermitidos:
    return false

  var banco: ptr sqlite3
  let caminhoBanco = normalizedPath(joinPath(getAppDir(), "..", "database", "user.db"))
  if sqlite3_open(caminhoBanco.cstring, addr banco) != SQLITE_OK:
    return false
  defer:
    discard sqlite3_close(banco)

  discard sqlite3_exec(banco, """
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      senha TEXT NOT NULL,
      cargo TEXT NOT NULL DEFAULT 'operador'
    )
  """.cstring, nil, nil, nil)
  discard sqlite3_exec(banco,
    "ALTER TABLE users ADD COLUMN cargo TEXT NOT NULL DEFAULT 'operador'",
    nil,
    nil,
    nil
  )

  var autorizacao: ptr sqlite3_stmt
  let sqlAutorizacao = "SELECT id FROM users WHERE username = ? AND senha = ? AND cargo = 'administrador'"
  if sqlite3_prepare_v2(banco, sqlAutorizacao.cstring, -1, addr autorizacao, nil) != SQLITE_OK:
    return false
  discard sqlite3_bind_text(autorizacao, 1, adminUsuario.cstring, -1, nil)
  discard sqlite3_bind_text(autorizacao, 2, adminSenha.cstring, -1, nil)
  let adminAutorizado = sqlite3_step(autorizacao) == SQLITE_ROW
  discard sqlite3_finalize(autorizacao)
  if not adminAutorizado:
    return false

  var insercao: ptr sqlite3_stmt
  let sqlInsercao = "INSERT INTO users (username, senha, cargo) VALUES (?, ?, ?)"
  if sqlite3_prepare_v2(banco, sqlInsercao.cstring, -1, addr insercao, nil) != SQLITE_OK:
    return false
  defer:
    discard sqlite3_finalize(insercao)
  discard sqlite3_bind_text(insercao, 1, novoUsuario.cstring, -1, nil)
  discard sqlite3_bind_text(insercao, 2, novaSenha.cstring, -1, nil)
  discard sqlite3_bind_text(insercao, 3, novoCargo.cstring, -1, nil)
  sqlite3_step(insercao) == SQLITE_DONE

add("validarLogin", validarLogin)
add("criarConta", criarConta)

add("frontendError", proc(mensagem: string): string =
  echo "[Frontend] " & mensagem
  ""
)

echo "Aplicação iniciada"

startDesktop(
  indexHtmlFile = "../web/html/login.html", # Define o login como primeira tela
  title = "Serra Sistema",
  width = 1000,
  height = 600,
  resizable = true,
  debug = true,
  run = true
)

echo "Aplicação encerrada"