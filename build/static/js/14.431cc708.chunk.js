(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[14],{1447:function(e,t,n){"use strict";n.r(t);var a=n(24),o=n(4),i=n(14),c=n(698),r=n(680),s=n(0),u=n(765),l=n(740),j=n.n(l),b=n(153),O=n(904),d=n.n(O),g=n(142),p=n(178),f=n(763),m=(n(962),n(745)),S=(n(960),n(687)),h=n(796),x=n(1),v="Routing",C=[];t.default=function(e){var t=Object(s.useState)(!1),n=Object(i.a)(t,2),l=(n[0],n[1],Object(s.useState)(!1)),O=Object(i.a)(l,2),w=O[0],D=O[1],N=Object(s.useState)(!0),R=Object(i.a)(N,2),L=(R[0],R[1],Object(s.useState)({})),k=Object(i.a)(L,2),y=k[0],M=k[1],U=Object(s.useState)(!1),I=Object(i.a)(U,2),P=I[0],A=I[1],F=Object(s.useState)(0),H=Object(i.a)(F,2),B=H[0],T=H[1],q=Object(s.useState)(!1),E=Object(i.a)(q,2),z=(E[0],E[1]),J=Object(s.useState)({columns:[],rows:[]}),V=Object(i.a)(J,2),K=V[0],W=V[1],G=Object(s.useState)({columns:[],rows:[]}),Q=Object(i.a)(G,2),X=Q[0],Y=Q[1],Z=Object(s.useState)(0),$=Object(i.a)(Z,2),_=$[0],ee=$[1],te=Object(s.useState)(!1),ne=Object(i.a)(te,2),ae=ne[0],oe=ne[1],ie=Object(s.useState)(!1),ce=Object(i.a)(ie,2),re=ce[0],se=ce[1],ue=Object(p.d)((function(e){return e.AllActionsRes})),le=Object(p.d)((function(e){return e.lookupRes})),je=Object(p.c)(),be=Object(s.useState)({RoutingCode:"",RoutingName:"",IsActive:!1}),Oe=Object(i.a)(be,2),de=Oe[0],ge=Oe[1],pe=Object(s.useState)({open:!1,severity:null,msg:"",viewList:!1,editList:!1,newList:!1}),fe=Object(i.a)(pe,2),me=fe[0],Se=fe[1],he=function(){je(Object(m.i)("FormName=".concat(v)))},xe=Object(s.useState)({columns:[{title:"Sequence",field:"StageSeq",render:function(e){return Object(x.jsx)("p",{children:e.StageSeq})}},{title:"Stage",field:"StageName",type:"numeric",render:function(e){return Object(x.jsx)(f.c,{columns:[],disabled:e.isDisabled,value:e.StageName,onClick:function(){A(!0),M(e)},onBlurDiv:function(){return null},lookupOpen:w,rows:[]})}},{title:"Machine",field:"MachineName",render:function(e){return Object(x.jsx)(f.c,{columns:[],value:e.MachineName,disabled:e.isDisabled,onClick:function(){D(!0),M(e)},onBlurDiv:function(){return null},lookupOpen:w,rows:[]})},type:"numeric"},{title:"Std Time",field:"StandardHours",render:function(e){return Object(x.jsx)(f.f,{variant:"outlined",symbol:!1,textAlign:"left",InputLabelProps:{shrink:!0},placeholder:"0.00",customInput:S.a,disabled:e.isDisabled,thousandSeparator:!0,decimalScale:2,fixedDecimalScale:2,value:e.StandardHours,Change:function(t){return De(Number(t.target.value.replace(/,/gi,"").split(e.Symbol).join("")),e,"StandardHours")}})}}],rows:[]}),ve=Object(i.a)(xe,2),Ce=ve[0],we=ve[1];console.log("Header",de);Object(s.useEffect)((function(){if(ue.error)je(Object(m.m)());else if(ue.createOrUpdateData)!0===ue.createOrUpdateData.Success&&Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{registerNotOpen:!1})}));else if(null!==ue&&void 0!==ue&&ue.singleList&&!0===(null===ue||void 0===ue?void 0:ue.singleList.Success)){if(ge(ue.singleList.Message.Header),ae){var e=ue.singleList.Message.Detail;e.map((function(e){e.isDisabled=!0})),console.log({arrForView:e}),we((function(t){return Object(o.a)(Object(o.a)({},t),{},{rows:e})})),C=e}else we((function(e){return Object(o.a)(Object(o.a)({},e),{},{rows:ue.singleList.Message.Detail})})),C=ue.singleList.Message.Detail;ge((function(e){return Object(o.a)(Object(o.a)({},e),{},{RoutingHead:""})}))}}),[ue]),Object(s.useEffect)((function(){le.error&&(Se(Object(o.a)(Object(o.a)({},me),{},{msg:le.error.message,severity:"error",open:!0})),je(Object(m.n)())),le.lookupData&&(!0===le.lookupData.Success&&(W(le.lookupData.Message.Machine),Y(le.lookupData.Message.Stages)),je(Object(m.o)()))}),[le]);var De=function(e,t,n){console.log({value:e}),console.log({rowData:t});var i=Object(a.a)(C),c=i.indexOf(t);i[c][n]=e,we(Object(o.a)(Object(o.a)({},Ce),{},{rows:i}))},Ne=function(){Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{registerNotOpen:!1})}))},Re=function(){Se(Object(o.a)(Object(o.a)({},me),{},{open:!1}))},Le=function(e,t,n){if("Machine"===n){var a=C,i=a.indexOf(y);a[i].MachineCode=t.MachineCode,a[i].MachineName=t.MachineName,a[i].LaborPerUnit=t.LaborPerUnit,a[i].OutputPerUnit=t.OutputPerUnit,a[i].PowerPerUnit=t.PowerPerUnit,D(!1),we(Object(o.a)(Object(o.a)({},Ce),{},{rows:a}))}else if("Stage"===n){var c=C,r=c.indexOf(y);c[r].StageCode=t.StageCode,c[r].StageName=t.StageName,A(!1),we(Object(o.a)(Object(o.a)({},Ce),{},{rows:c}))}},ke=function(e){var t="FormName=".concat(v,"&RoutingCode=").concat(e.RoutingCode);je(Object(m.j)(t))},ye=function(){se(!0),ke({RoutingCode:de.RoutingCode})};return Object(x.jsxs)(x.Fragment,{children:[Object(x.jsxs)(c.a,{container:!0,children:[Object(x.jsx)(c.a,{item:!0,xs:12,children:Object(x.jsx)(f.d,{property:me,close:Re,onClick:Re})}),Object(x.jsx)(f.k,{Details:"Routing Maintenance List",FormName:"Routing",FormCode:"RoutingCode",props:e,dialog:!0,AddData:function(){Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{editData:!1,registerNotOpen:!0,newData:!0})})),we((function(e){return Object(o.a)(Object(o.a)({},e),{},{rows:[]})})),ge((function(e){return Object(o.a)(Object(o.a)({},e),{},{RoutingCode:"",RoutingName:"",IsActive:!0})})),oe(!1),se(!1),he()},EditData:function(e){ge(e),oe(!1),Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{registerNotOpen:!0,editList:!0,newList:!1})})),ke(e),he()},DialogClose:Ne,saveFunction:B,SetRowDataID:function(e){ee(e.RoutingCode)},dosaveFunction:T,setLoadingOnSave:z,ID:_,ViewData:function(e){Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{registerNotOpen:!0,editData:!1,newData:!1})})),ke(e),oe(!0)},FormID:"Routing",postingIcons:!1,isEditButton:!0})]}),Object(x.jsx)(u.a,{widthAllow:"md",Title:"Routing Maintenance",IsOpen:me.registerNotOpen,Close:Ne,Body:Object(x.jsx)(x.Fragment,{children:Object(x.jsx)(c.a,{container:!0,spacing:3,children:Object(x.jsx)(c.a,{item:!0,xs:12,children:Object(x.jsx)(b.a,{children:Object(x.jsxs)(c.a,{container:!0,spacing:2,alignItems:"center",children:[Object(x.jsx)(c.a,{item:!0,xs:5,children:Object(x.jsx)(f.g,{label:"Routing Code",value:de.RoutingCode,Change:function(e){return ge(Object(o.a)(Object(o.a)({},de),{},{RoutingCode:e.target.value}))},Blur:ye,disabled:ae||re||me.editList})}),Object(x.jsx)(c.a,{item:!0,xs:5,children:Object(x.jsx)(f.g,{label:"Routing Name",value:de.RoutingName,Change:function(e){return ge(Object(o.a)(Object(o.a)({},de),{},{RoutingName:e.target.value}))},disabled:ae})}),Object(x.jsx)(c.a,{item:!0,xs:2,children:Object(x.jsx)(f.a,{label:"Active",disabled:ae,checked:de.IsActive,Change:function(e){return ge(Object(o.a)(Object(o.a)({},de),{},{Active:de.IsActive}))}})}),Object(x.jsx)(c.a,{item:!0,xs:1}),Object(x.jsx)(c.a,{item:!0,xs:12,children:Object(x.jsx)(j.a,{columns:Ce.columns,data:Ce.rows,title:!0===!ae?Object(x.jsx)("div",{children:Object(x.jsx)(r.a,{variant:"text",onClick:function(){return function(){var e=Object(a.a)(Ce.rows),t={StageCode:"",StageName:"",LaborPerUnit:"",OutputPerUnit:"",PowerPerUnit:"",MachineCode:"",MachineName:"",StandardHours:"",isDisabled:!1};e.length?(e[e.length-1],t.StageSeq=e.length+1,e.push(Object(o.a)({},t))):(t.StageSeq=1,e.push(Object(o.a)({},t))),C=e,we(Object(o.a)(Object(o.a)({},Ce),{},{rows:C}))}()},children:"+ Add Item"})}):null,icons:h.a,style:{border:"none",backgroundColor:"transparent",boxShadow:"none",paddingTop:"0px !important"},options:{showTitle:!0,toolbar:!0,paging:!1,actionsColumnIndex:-1,pageSize:5,pageSizeOptions:[5,10,20,30],search:!1,loadingType:"linear",headerStyle:{fontWeight:"bold",paddingLeft:"10px",paddingRight:"0px",paddingTop:"0px",paddingBottom:"0px",textAlign:"left"},actionsCellStyle:{justifyContent:"center",alignItems:"center",width:20}},actions:[function(e){return{icon:function(){return Object(x.jsx)(d.a,{sx:{color:g.a[500]},style:{height:"1em",width:"1em"}})},tooltip:"Delete",disabled:ae,onClick:function(e){!function(e){var t=Object(a.a)(Ce.rows),n=t.indexOf(e);t.splice(n,1),we(Object(o.a)(Object(o.a)({},Ce),{},{rows:t}))}(e)}}}]})})]})})})})}),ButtonTitle1:"Save",ButtonTitle2:"Cancel",ButtonTitle3:"OK",Save:function(){if(oe(!1),null===de.RoutingCode||void 0===de.RoutingCode||""===de.RoutingCode?(Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{open:!0,severity:"error",msg:"Routing Code is Empty",registerNotOpen:!0})})),0):null===de.RoutingName||void 0===de.RoutingName||""===de.RoutingName?(Se((function(e){return Object(o.a)(Object(o.a)({},e),{},{open:!0,severity:"error",msg:"RoutingName is Empty",registerNotOpen:!0})})),0):0===Ce.rows.length?(Se(Object(o.a)(Object(o.a)({},me),{},{msg:" Sequence Data can not be empyt",severity:"error",open:!0,registerNotOpen:!0})),0):!(Ce.rows.filter((function(e,t){return""===e.StageCode||""===e.StageName||""===e.MachineCode||""===e.StandardHours})).length>0)||(Se(Object(o.a)(Object(o.a)({},me),{},{msg:"Please completly Fill Rows Data",severity:"error",open:!0,registerNotOpen:!0})),0)){var e={FormName:v,Header:de,Detail:Ce.rows};je(Object(m.a)(e))}},ShowSave:ae}),Object(x.jsx)(f.j,{large:!1,LookUpHeading:"Machine LookUp",LookUpOpen:w,LookUpClose:function(){return D(!1)},setLookUpData:function(e,t){return Le(0,t,"Machine")},LookupList:K}),Object(x.jsx)(f.j,{LookUpOpen:P,large:!1,LookUpHeading:"Stage LookUp",LookupList:X,setLookUpData:function(e,t){return Le(0,t,"Stage")},LookUpClose:function(){return A(!1)},ok:function(){return A(!1)}})]})}},962:function(e,t,n){"use strict";var a=n(22),o=n(21),i=n(47),c=n(48),r=n(0),s=n(1033),u=n(740),l=n.n(u),j=n(1);r.Component}}]);
//# sourceMappingURL=14.431cc708.chunk.js.map