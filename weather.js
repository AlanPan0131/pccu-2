var userID;
var info;
var newData={};
var VE;
function ajax(){
return new Promise(function(resolve, reject) {
var request = new XMLHttpRequest()
request.responseType = 'text'
request.onreadystatechange=function(){
if (request.readyState === XMLHttpRequest.DONE){
if (request.status === 200){
  resolve(request.responseText)
}else{
  reject(new Error(request.statusText))
}}}
request.onerror=()=>{reject(new Error('Network Error'))}
request.open('GET','https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWB-2C162C9D-F4FB-4C4A-88CD-17745742A4BE&format=JSON&elementName=&parameterName=CITY', true)
request.send()
})
}
liff.init({liffId:'1655168208-DL1V4lM5'}).then(()=>{
  userID=liff.getContext().userId;
  console.log(userID)
  load();
}).catch((error)=>{
    alert(error)
});
function load(){
Promise.all([ajax(),firebase.database().ref('/users/' +userID).once('value')])
.then(tdata=>{
    var station=JSON.parse(tdata[0]).records.location;
    station.sort(function(a,b){
return a.parameter[0].parameterValue.charCodeAt(0)-b.parameter[0].parameterValue.charCodeAt(0);
});
station=station.map(a=>{
return {pla:a.locationName,loca:a.parameter[0].parameterValue};
})
    new Vue({
el: '#collapseExample',
data: {list:station}
});
if(!tdata[1].exists()&&false){
fetch(
    'https://api.line.me/v2/bot/profile/' +userID,
    {
        headers: {
            Authorization:
                'Bearer NZiqx9sB9yEa0oNPh/RRjtgSqhytmZ69Gh01rZ+iSk1txZ4v3KcXJ9RUPELLNgEhHfgXjqvEqmVrJJcShEKICHHH+QTWqrRSIeTQsZPtID1IvgWo55/pTGYO3Vg6ho7irifGcOjjm4R0vRVO+53MuQdB04t89/1O/w1cDnyilFU='
        }
    }
).then(body=>{
        info = body.json();
        info.weather = '';
        info.eat = '';
        info.openEat = 0;
        firebase
            .database()
            .ref('/users/' + info.userId)
            .set(info);
    });
}else info=tdata[1].val();

if(Object.keys(info).indexOf('weather')==-1){
info.weather = '';
        info.eat = '';
        info.openEat = 0;
firebase.database().ref('/users/' +userID).set(info)
}
 var data=info.weather.split(',');
if(data.length!=1)
for(var i=0;i<data.length;i++)Array.from(document.querySelectorAll('input[value="'+data[i]+'"]'))[0].checked=true;
if(info.openEat)Array.from(document.querySelectorAll('#customSwitch1'))[0].checked=true;
var dataFromEat=info.eat.split(',').map(function(obj){
return {value:obj};
})
VE=new Vue({
el: '#eatInput',
data: {list:dataFromEat},
methods:{
checkName:e=>{
console.log(e)
setTimeout(()=>console.log(dataFromEat),500)
}
}
});
eatCheck();
document.querySelectorAll('.load')[0].style.visibility='hidden';
})}
function eatCheck(){
if(!$('#customSwitch1').is(":checked")){
document.querySelectorAll('input[type="text"]').forEach(da=>{
da.disabled=true;
});
document.getElementById('btnOfEat').disabled=true;
}else{
document.querySelectorAll('input[type="text"]').forEach(da=>{
da.disabled=false;
});
document.getElementById('btnOfEat').disabled=false;
}}
function save(){
if(userID==''){alert('錯誤');return;}
var newString=$("input[name='station[]']:checked").map(function(){return $(this).val()}).get();
if(newString.length>9){alert('錯誤:輪播訊息最多只能容納10則天氣訊息');return;}
if(info.weather!=newString.toString())newData['/users/'+userID +'/weather']=newString.toString();
if($('#customSwitch1').is(":checked"))newData['/users/'+userID +'/openEat']=1;
else newData['/users/'+userID +'/openEat']=0;
var tdata=[];
document.querySelectorAll('input[type="text"]').forEach(da=>{
if(da.value)tdata.push(da.value);
})
if(info.eat!=tdata.toString())newData['/users/'+userID +'/eat']=tdata.toString();
if(Object.keys(newData).length>0)
firebase.database().ref().update(newData).then(()=>{
liff.closeWindow();
});
else liff.closeWindow();
}
function addEat(){
VE.list.push({value:''});
}