export async function checkVersion() {
  try {
    const currentVersion = import.meta.env.PACKAGE_VERSION
    const response = await fetch('/styllus_controle/version.json?_=' + Date.now())
    const { version } = await response.json()

    if (version !== currentVersion) {
      console.warn('Nova versão detectada. Recarregando...')
      localStorage.clear() // limpa cache local
      location.reload(true)
    }
  } catch (e) {
    console.error('Erro ao verificar versão', e)
  }
}
