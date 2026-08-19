import nimview

echo "Aplicação iniciada"

startDesktop(
  indexHtmlFile = "login.html", # Define o login como primeira tela
  title = "Serra Sistema",
  width = 1000,
  height = 600,
  resizable = true,
  debug = true,
  run = true
)

echo "Aplicação encerrada"