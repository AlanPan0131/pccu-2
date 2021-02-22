
  // localStorage.clear();
  
  document.getElementById("search").onclick=input
var isIOS=navigator.userAgent.match(/(iPad|iPhone|iPod)/g);

function install(){
  if(isIOS){
    bootbox.alert("在Safari開啟本網站->點下方有方形和箭頭的按鈕->加入主畫面");
    return;
  }
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {});
}

window.onpopstate=function(){
  var loc=decodeURIComponent(location.pathname).split('/');
  if((loc.length==4&&loc[1]=='search'))searchT(loc[3],loc[2],false);
        else if(loc.length==3)FB(loc[1],loc[2],false);
        else document.getElementById('accordion')='';
};
    var Tname=[];
    var mob=0;
    var open={};
    var data={};
    if(localStorage.getItem('FB'))data=JSON.parse(localStorage.getItem('FB'))
    var arrOfData=[];
    if (navigator.standalone||window.matchMedia('(display-mode: standalone)').matches)document.getElementById('ins').style.display='none';
    
    function load(){
      if(location.href=='https://pccu-2.web.app/'&&'serviceWorker' in navigator)navigator.serviceWorker.register('service-worker.js').catch(err=>console.log(err));
      document.getElementById("search").addEventListener("input",input);
      if(Tname.length==0){
        var loSt=localStorage.getItem('Tname');
        if(!loSt){
          getURL('https://alanpan0131.github.io/pccu-2/teacher.json').then(querySnapshot=>{
  Tname=JSON.parse(querySnapshot).teacher;
            localStorage.setItem('Tname',querySnapshot);
      })
  }else Tname=JSON.parse(loSt).teacher;
  }
     if(!localStorage.getItem('theme')){
  if(window.matchMedia('(prefers-color-scheme:dark)').matches){
    if(!document.getElementById('customSwitch1').checked)document.getElementById('mode').click();
      else{
        document.getElementById('mode').innerText="極黑";
    document.getElementById('mode').style.color="#fff";
    document.documentElement.style.setProperty('--bgc',"#0e4b4a");
    document.querySelectorAll('nav')[0].classList='navbar navbar-expand-lg navbar-dark bg-dark';
    document.getElementById('upa').style.color="rgba(255,255,255,.5)";
    document.documentElement.style.setProperty('--menu',"#343a40");
    document.documentElement.style.setProperty('--item',"#fff");
      }
    localStorage.setItem('theme','dark')
  }else{
    localStorage.setItem('theme','light')
  }}else if(localStorage.getItem('theme')=='dark')
  if(!document.getElementById('customSwitch1').checked)document.getElementById('mode').click();
  else{
    document.getElementById('mode').innerText="極黑";
    document.getElementById('mode').style.color="#fff";
    document.documentElement.style.setProperty('--bgc',"#0e4b4a");
    document.querySelectorAll('nav')[0].classList='navbar navbar-expand-lg navbar-dark bg-dark';
    document.getElementById('upa').style.color="rgba(255,255,255,.5)";
    document.documentElement.style.setProperty('--menu',"#343a40");
    document.documentElement.style.setProperty('--item',"#fff");
  }
      if(window.innerWidth<=900)document.getElementById('upa').innerHTML=document.getElementById('upa').innerHTML.split('，<br>').toString();
      var loStData=localStorage.getItem('data');
      var listKeys=[];
      var list;
      if(!loStData){
        getURL('https://alanpan0131.github.io/pccu-2/newData.json').then(querySnapshot=>{
          list=JSON.parse(querySnapshot);
          listKeys=Object.keys(list);
          localStorage.setItem('data',querySnapshot);
          outOfBar();
              })
      }else{
         list=JSON.parse(loStData);
         listKeys=Object.keys(list);
          outOfBar();
    }
    function outOfBar(){
            var leftBar='';
            var colorBar='b3';
        for(var i=0;i<listKeys.length;i++){
          if(i==5)colorBar='b2';
          else if(i==18)colorBar='self';
          leftBar+='<div class="btn-group shadow-sm" role="group"><li class="btn btn-outline-'+colorBar+'" onclick="outBar(this)">'+listKeys[i]+'<ul class="dropdown-menu clo">'+inOfBar(i)+'</ul></li></div>';
        }
            document.getElementById('bar').innerHTML=leftBar;
        }
        function inOfBar(i){
            var str='';
            var arrOflist=Object.keys(list[listKeys[i]]);
            for(var j=0;j<arrOflist.length;j++){
              if(arrOflist[j]!='index')
              str+='<li class="dropdown-item" onclick="inBar(this)">'+arrOflist[j]+'<ul class="dropdown-menu clo">'+inOfBarin(list[listKeys[i]][arrOflist[j]],arrOflist[j])+'</ul></li>';
            }
            return str;
        }
        function inOfBarin(e,c){
          var str='';
            for(var j=0;j<e.length;j++){
              var name=e[j].split("︰");
              if(!name[1])name=name[0];
              else name=name[1];
              name=name.split('：');
              if(name.length==1)name=name[0];
              else if(name.length==2)name=name[1];
              else name=name[1]+name[2];
              
              str+='<li class="dropdown-item" onclick="FB(\''+c+'\',\''+e[j]+'\',true)">'+name+'</li>';
            }
            return str;
        }
        var loc=decodeURIComponent(location.pathname).split('/');
        if((loc.length==4&&loc[1]=='search'))searchT(loc[3],loc[2],false);
        else if(loc.length==3)FB(loc[1],loc[2],false);
        else document.getElementById('accordion').innerHTML='';
      }
      var ob;
      var ib;
      function outBar(e){
        if(ob!=e){
        Array.from(document.querySelectorAll('#bar')[0].querySelectorAll('.dropdown-menu')).forEach(c=>{
          c.classList="dropdown-menu clo";
        })
        Array.from(e.querySelectorAll('.dropdown-menu'))[0].classList="dropdown-menu pip";
        ob=e;
      }}
      function inBar(e){
        if(ib!=e){
          Array.from(ob.children[0].children).forEach(d=>{
            d.children[0].classList="dropdown-menu clo";
          })
        Array.from(e.querySelectorAll('ul'))[0].classList="dropdown-menu pip";
        ib=e;
      }}
    function FB(e,b,s=true){
      open={};
      if(mob)menu();
      if(b.indexOf('通識')!=-1)e='通識';
      if(b.indexOf('跨域')!=-1)e='跨域';
      if(e=='全民國防教育軍事訓練')e='軍訓';
        if(arrOfData.indexOf(e+'/'+b)==-1){
        if(s){
          history.pushState(null, null, '/'+e+'/'+b);
        Array.from(ob.querySelectorAll('.dropdown-menu')).forEach(d=>{
        d.classList="dropdown-menu clo";
      })}
      setTimeout(()=>{
        ib=null;
        ob=null;
      },100)
      var db = firebase.firestore().collection("class").where("name", "==", b);
      if(b.indexOf('通識')==-1&&b.indexOf('跨域')==-1&&e!='全民國防教育軍事訓練')db=db.where("college", "==", e);
var newD={};
      db.get().then(querySnapshot=>{
        querySnapshot.forEach(function(doc){
          var oneOfData=doc.data();
          if(b.indexOf('跨域')!=-1){
          if(!newD[e+'/'+oneOfData.name])newD[e+'/'+oneOfData.name]={};
          newD[e+'/'+oneOfData.name][doc.id]=oneOfData;
          }else{
            if(!newD[oneOfData.college+'/'+oneOfData.name])newD[oneOfData.college+'/'+oneOfData.name]={};
          newD[oneOfData.college+'/'+oneOfData.name][doc.id]=oneOfData;
          }
          var arrOfNewD=Object.keys(newD);
arrOfNewD.forEach(c=>{
  arrOfData.push(c);
  data[c]=newD[c];
  localStorage.setItem('FB',JSON.stringify(data))
})
        });
        setTimeout(()=>write(e+'/'+b),200);
      })
        }else write(e+'/'+b);
    }
    function write(e){
            var snapshot=data[e];
            var arr=Object.keys(snapshot);
            var str='';
            for(var i=0;i<arr.length;i++){
              var name=snapshot[arr[i]].name.split('︰');
            name=name[name.length-1];
            name=name.split('：');
            name= name[name.length-1];
              str+='<div class="card"><div class="card-header btn-outline-self dropdown-toggle" data-toggle="collapse" data-target="#id-'+arr[i]+'" aria-expanded="true" aria-controls="collapseOne" onclick="evaluation(\''+arr[i]+'\')"><h5>'+name+'\n\n'+snapshot[arr[i]].id+'\n\n'+snapshot[arr[i]].teacher+'</h5></div><div id="id-'+arr[i]+'" class="collapse hide"></div></div>';
            }
            document.getElementById('accordion').innerHTML=str;
        }
    function searchT(e,b,s=true){
if(e){
      open={};
      if(s){
        document.getElementById('sug').classList.remove('show');
    document.getElementById('sug').innerHTML='';
    setTimeout(()=>history.pushState(null, null, '/search/'+b+'/'+e),10);
      }
      var path='search/'+b+'/'+e;
      document.getElementById('search').value='';
      document.getElementById('sug').classList.remove('show');
        if(!data[path]){
          var nData={};
          firebase.firestore().collection("class").where("teacher", "array-contains", e).get().then(querySnapshot=>{
            querySnapshot.forEach(function(doc) {
        nData[doc.id]=doc.data();
            })
            data[path]=nData;
            localStorage.setItem('FB',JSON.stringify(data))
            setTimeout(()=>write(path),200);
          })
      }else write(path);
    }else bootbox.alert("查詢錯誤");
    }
    var dataOfEvaluation={};
    function evaluation(e){
      function write2(snapshot){
      var arr=Object.keys(snapshot);
        dataOfEvaluation[e]=snapshot;
        var str='';
        var t=0;
        function chSt(p){
          if(p>=80)return 'success';
          if(p>=60)return 'warning';
          return 'danger';
        }
        for(var i=0;i<arr.length;i++){
          var point=snapshot[arr[i]].point;
          t+=point;
          var dat=new Date(snapshot[arr[i]].date);
          str+='<div class="card"><div class="card-body"><p>'+dat.getFullYear()+'.'+(dat.getMonth()+1)+'</p>';
          str+='評分<div class="progress"><div class="progressOut" style="width:'+point+'%"><div class="progress-bar bg-'+chSt(point)+'">'+point+'</div></div></div>';
          if(snapshot[arr[i]].way)str+='<hr><h5>授課方式</h5><br>'+snapshot[arr[i]].way;
          if(snapshot[arr[i]].exam)str+='<hr><h5>考試模式</h5><br>'+snapshot[arr[i]].exam;
          if(snapshot[arr[i]].evaluation)str+='<hr><h5>評語</h5><br>'+snapshot[arr[i]].evaluation;
          str+='<i data-toggle="dropdown"><svg width="1em" height="1em"><path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></svg><div class="dropdown-menu '
            if(window.innerWidth<=900)str+='dropdown-menu-right';
            str+='" aria-labelledby="navbarDropdown"><div class="dropdown-item" onclick="report(\''+arr[i]+'\')">檢舉</div></div></i></div></div>';
        }
        t=Math.floor(t/arr.length);
        document.getElementById('id-'+e).innerHTML=('<div class="btn btn-outline-self addHas" onclick="openNew(\''+e+'\')">新增評價</div><div class="card-body">平均分數<div class="progress"><div class="progressOut" style="width:'+t+'%"><div class="progress-bar bg-'+chSt(t)+'">'+t+'</div></div></div><br>'+str+'</div>');
    }
      if(!dataOfEvaluation[e]){
      firebase.database().ref('/evaluation').orderByChild('class').equalTo(e).once('value').then(snapshot=>{
        if(snapshot=snapshot.val())write2(snapshot);
       else{
         dataOfEvaluation[e]={};
         document.getElementById('id-'+e).innerHTML='<table><tr><td><div class="card-body noReport">尚無評價</div></td><td><center><div class="btn btn-outline-self" onclick="openNew(\''+e+'\')">新增評價</div></center></td><td></td></tr></table>';
       }
       open[e]=1;
      })
    }else{
      if(!open[e]){
        if(Object.keys(dataOfEvaluation[e])!=0)write2(dataOfEvaluation[e]);
        else document.getElementById('id-'+e).innerHTML='<table><tr><td><div class="card-body noReport">尚無評價</div></td><td><center><div class="btn btn-outline-self" onclick="openNew(\''+e+'\')">新增評價</div></center></td><td></td></tr></table>';
        open[e]=1;
      }else open[e]=0;
    }}
    function report(e){
      bootbox.confirm({
        "message":"確定要檢舉這筆評分?",
        locale: "zh_TW",
        callback:result=>{
          if(result){
            var k=firebase.database().ref('/report').push().key;
            firebase.database().ref('/report/'+k).set(e)
            .then(()=>{
              bootbox.alert("成功送出");
            })}
}})}
document.defaultView.onscroll=()=>{
  if(window.scrollY!=0)document.getElementById('up').style.visibility='visible';
  else document.getElementById('up').style.visibility='hidden';
  };
  up=()=>window.scroll(0,0);
function menu(){
  if(!mob){
    mob=1;
  Array.from(document.getElementsByClassName('barOut'))[0].style.display='block';
  Array.from(document.getElementsByClassName('mobiMenu'))[0].innerHTML="關閉";
  Array.from(document.getElementsByClassName('mobiMenu'))[0].className="mclose btn btn-dark";
  }else{
    mob=0;
    Array.from(document.getElementsByClassName('barOut'))[0].style.display='none';
  Array.from(document.getElementsByClassName('mclose'))[0].innerHTML="選單";
  Array.from(document.getElementsByClassName('mclose'))[0].className="mobiMenu";
  }}
var kw='';
function input(){
  document.getElementById('sug').classList.add('show');
  var k=document.getElementById('search').value;
  if(!k){
    document.getElementById('sug').classList.remove('show');
    document.getElementById('sug').innerHTML='';
  }else if(k!=kw){
  var su='';
      if(k)Tname.forEach(n=>{
    if(n.indexOf(k)!=-1)su+='<div class="dropdown-item" onclick="searchT(\''+n+'\',\'teacher\')">'+n+'</div>';
    });
 document.getElementById('sug').innerHTML=su;
}
kw=k;
}
document.addEventListener('click',e=>{
  var DOMclass=e.target.parentNode;
  if(e.target.id=="search"){
    if(kw)document.getElementById('sug').classList.add('show');
    }else if(DOMclass){
  DOMclass=Array.from(DOMclass.classList);
  if(DOMclass.indexOf('dropdown-menu')==-1&&DOMclass.indexOf('btn-group')==-1){
  Array.from(document.querySelectorAll('#bar')[0].querySelectorAll('.dropdown-menu')).forEach(d=>{
    d.classList="dropdown-menu clo";
  });
  ob=null;
  ib=null;
}}
else if(window.innerWidth>900||kw=='')document.getElementById('sug').classList.remove('show');
});

function openNew(e){
  location='https://pccu-2.web.app/form/'+e;
}
function modeChange(e){
  if(e.checked){
    document.getElementById('mode').innerText="極黑";
    document.getElementById('mode').style.color="#fff";
    document.documentElement.style.setProperty('--bgc',"#0e4b4a");
    document.querySelectorAll('nav')[0].classList='navbar navbar-expand-lg navbar-dark bg-dark';
    document.getElementById('upa').style.color="rgba(255,255,255,.5)";
    document.documentElement.style.setProperty('--menu',"#343a40");
    document.documentElement.style.setProperty('--item',"#fff");
    localStorage.setItem('theme','dark');
  }else{
    document.getElementById('mode').innerText="極白";
    document.getElementById('mode').style.color="#000";
    document.documentElement.style.setProperty('--bgc',"#aacdc6");
    document.querySelectorAll('nav')[0].classList='navbar navbar-expand-lg navbar-light bg-light';
    document.getElementById('upa').style.color="unset";
    document.documentElement.style.setProperty('--menu',"#fff");
    document.documentElement.style.setProperty('--item',"#212529");
    localStorage.setItem('theme','light');
  }
}
function getURL(url){
  return new Promise((re,j)=>{
    function reqListener () {
      re(this.responseText);
    }
    var oReq = new XMLHttpRequest();
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", url);
    oReq.send();
  })
 
}

