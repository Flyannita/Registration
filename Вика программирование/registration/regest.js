function chemail(idshka,formochka) {
	r = new FormData(formochka)
  i = r.get("mail")
  e = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}/
  n = i.match(e)
  d = document.getElementById(idshka)
  console.log(n)
  if (n == null) {

    d.style.color = "red"
    d.style.border = "1px solid red"
    return false
 
  } else {
    d.style.color = "black"
    d.style.border = "1px dashed #e67d37"
    return true
  }
}

function chepass(formochka, idshka) {
	r = new FormData(formochka)
  j = r.get("pass")
  o = /[A-Z]+[a-z]+[0-9]+/
  n = j.match(o)
  h = document.getElementById(idshka)
  console.log(n)
  if (n == null) {
		
    h.style.color = "red"
    h.style.border = "1px solid red"
 		return false
  } else {
    h.style.color = "black"
    h.style.border = "1px dashed #e67d37"
    return true
  }
}

async function registration(){
f = document.getElementById("fmor")
l = chepass(f,"pass")
o = chemail("email",f)
r = new FormData(f)
i = r.get("mail")
j = r.get("pass")
if (l && o) {
https = "https://server-kege100.onrender.com/get_data?key=" + i 
get_response = await fetch(https)
dataget = await get_response.json()
if (dataget.error){
post_response = await fetch("https://server-kege100.onrender.com/set_data", { 
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({ key: i, value: j})
})
if (post_response.ok){
dataResp = await post_response.json()
if (dataResp.success){
v = document.getElementById("regist")
e = document.getElementById("lololoshka")
v.style.display = "none"
e.style.display = "block"
}
else{
console.error("ошибка при регистрации")
}
}
else{
console.error("ошибка сети")
}
}
else{
alert("Такая почта уже существует, переводим вас на страницу входа")
enr()
}


}
}


async function enter(){
f2 = document.getElementById("fmr")
l = chepass(f2,"pas")
o = chemail("emai",f2)
r = new FormData(f2)
i = r.get("mail")
j = r.get("pass")
if (l && o) {
https = "https://server-kege100.onrender.com/get_data?key=" + i 
get_response = await fetch(https)
dataget = await get_response.json()
if (dataget.error){
alert("Такой почты не существует")
}
else{
if (dataget==j){
v = document.getElementById("enter")
e = document.getElementById("lololoshka")
v.style.display = "none"
e.style.display = "block"
}
else{
alert("Почта или пароль не совпадают")
}
}
}
}

function enr(){
v = document.getElementById("enter")
e = document.getElementById("regist")
e.style.display = "none"
v.style.display = "block"
}
 
function rg(){
v = document.getElementById("enter")
e = document.getElementById("regist")
v.style.display = "none"
e.style.display = "block"  
}

function exitloloshka(){
v = document.getElementById("enter")
e = document.getElementById("lololoshka")
e.style.display = "none"
v.style.display = "block"
}
 