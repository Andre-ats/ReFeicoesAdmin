const isDevelop = window.location.href.includes("refeicoesadmin")

export var API_URL = ""

if(isDevelop){
    API_URL = "https://refeicoesbackend-production.up.railway.app"
}else{
    API_URL = "https://refeicoesbackend-production.up.railway.app"
}