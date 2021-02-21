
  function load(){
    if(localStorage.getItem('theme')=='dark'){
      document.documentElement.style.setProperty('--bgc',"#0e4b4a");
      document.documentElement.style.setProperty('--menu',"#343a40");
      document.documentElement.style.setProperty('--item',"#fff");
      document.querySelectorAll('nav')[0].classList='navbar navbar-expand-lg navbar-dark bg-dark';
      document.getElementById('upa').style.color="rgba(255,255,255,.5)";
   }
  
    var path=location.pathname.split('/');
    if(path.length==3)document.getElementById('code').value=path[2];
    }
    function send(){
      function checkString(str){
        str=str.replace(new RegExp("&","gm"),"&amp;");
        str=str.replace(new RegExp("<","gm"),"&lt;");
        str=str.replace(new RegExp(">","gm"),"&gt;");
        str=str.replace(new RegExp("/","gm"),"&#x2F;");
        str=str.replace(new RegExp("'","gm"),"&#x27;");
        str=str.replace(new RegExp('"',"gm"),"&#x22;");
        return str;
      }
    var code=document.getElementById('code').value;
    var err='';
    if(!code)err+='<label><a tabindex>課程代碼</a></label>\n未填寫<br>';
    var point=eval(document.getElementById('point').value);
    if(point<0||point>100)err+='<label><a tabindex>課程評分</a></label>\n只能是0~100<br>';
    var way=document.getElementById('way').value;
  if(!way)err+='<label><a tabindex>授課方式</a></label>\n未填寫<br>'
  else way=checkString(way);
  var evaluation=document.getElementById('evaluation').value;
  if(!evaluation)err+='<label><a tabindex>課程評語</a></label>\n未填寫<br>'
  else evaluation=checkString(evaluation);
  if(err!=''){
    bootbox.alert({
      title: "錯誤",
      message: err
  });
  return;
  }
  
  
  var exam=[];
  
  document.querySelectorAll('input[name="way"]').forEach(e=>{
            if(e.checked)exam.push(e.value);
          })
  
    var updates = {};
    updates['/evaluation/'+firebase.database().ref('/evaluation').push().key]={
      class:code,
      point:point,
      evaluation:evaluation,
      date:(new Date()).toISOString(),
      way:way,
      exam:exam.toString()
    };
    firebase.database().ref().update(updates).then(()=>{
      bootbox.alert({
      message: "成功送出",
      callback:()=>{
          location='https://pccu-2.web.app/';
      }})});
    }
    function way(e){
      if(e.checked){
        e.parentElement.querySelectorAll('label[for="'+e.id+'"]')[0].innerHTML+='<svg width="16" height="16" fill="currentColor"><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"></svg>'
          e.parentElement.querySelectorAll('label[for="'+e.id+'"]')[0].style['padding-right']='5px';
        }else{
          e.parentElement.querySelectorAll('label[for="'+e.id+'"]')[0].innerHTML=e.parentElement.querySelectorAll('label[for="'+e.id+'"]')[0].innerHTML.split('<svg')[0];
          e.parentElement.querySelectorAll('label[for="'+e.id+'"]')[0].style['padding-right']='21px';
        }}