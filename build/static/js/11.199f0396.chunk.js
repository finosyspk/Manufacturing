(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[11],{1451:function(e,t,a){"use strict";a.r(t);var n,o=a(5),i=a(24),c=a(4),r=a(14),s=a(0),u=a(948),l=a.n(u),d=a(698),O=a(688),b=a(403),j=a(404),m=a(680),p=(a(765),a(740)),g=a.n(p),f=a(178),h=a(763),S=a(745),C=a(904),v=a.n(C),M=a(781),y=a(153),x=a(95),N=a(426),w=a(142),k=a(795),L=a(780),U=a(1),I="MOIssuance",D=!1,T=[];t.default=function(e){var t=Object(N.a)(),a=Object(s.useState)(!1),u=Object(r.a)(a,2),p=u[0],C=u[1],Q=Object(s.useState)(!1),R=Object(r.a)(Q,2),H=(R[0],R[1],Object(s.useState)("")),B=Object(r.a)(H,2),F=(B[0],B[1]),P=Object(s.useState)(!1),E=Object(r.a)(P,2),V=E[0],A=E[1],q=Object(s.useState)(!1),_=Object(r.a)(q,2),z=_[0],W=_[1],J=Object(s.useState)(!1),K=Object(r.a)(J,2),G=K[0],X=K[1],Y=Object(s.useState)(!1),Z=Object(r.a)(Y,2),$=(Z[0],Z[1]),ee=Object(s.useState)(!0),te=Object(r.a)(ee,2),ae=te[0],ne=te[1],oe=Object(s.useState)([]),ie=Object(r.a)(oe,2),ce=(ie[0],ie[1],Object(s.useState)({})),re=Object(r.a)(ce,2),se=re[0],ue=re[1],le=Object(s.useState)([]),de=Object(r.a)(le,2),Oe=de[0],be=de[1],je=Object(f.c)(),me=Object(f.d)((function(e){return e.AllActionsRes})),pe=Object(f.d)((function(e){return e.lookupRes})),ge=Object(s.useState)(!1),fe=Object(r.a)(ge,2),he=fe[0],Se=fe[1],Ce=Object(s.useState)(!1),ve=Object(r.a)(Ce,2),Me=(ve[0],ve[1]),ye=Object(s.useState)(!1),xe=Object(r.a)(ye,2),Ne=xe[0],we=xe[1],ke=Object(s.useState)(null),Le=Object(r.a)(ke,2),Ue=Le[0],Ie=(Le[1],Object(s.useState)(0)),De=Object(r.a)(Ie,2),Te=De[0],Qe=(De[1],Object(s.useState)(!1)),Re=Object(r.a)(Qe,2),He=(Re[0],Re[1]),Be=Object(s.useState)(0),Fe=Object(r.a)(Be,2),Pe=Fe[0],Ee=(Fe[1],Object(s.useState)(!1)),Ve=Object(r.a)(Ee,2),Ae=Ve[0],qe=Ve[1],_e=Object(s.useState)({TransDate:new Date,TransNo:"",TransType:"PCK",MOTransNo:"",ItemCode:"",Item:"",MOID:"",UOMCode:"",UOM:"",UnitQuantity:"",BaseQuantity:"",RoutingCode:"",RoutingName:"",LocationCode:"",Location:"",StageCode:"",StageName:"",MachineName:"",MachineCode:"",StartTime:"00:00",EndTime:"00:00",TotalHours:"00:00",UnitStarted:"",UnitsProduced:"",RequireQC:!1,Completed:!1}),ze=Object(r.a)(_e,2),We=ze[0],Je=ze[1],Ke=Object(s.useState)({columns:[{title:"ItemCode",field:"CItemCode",cellStyle:{width:"20%"},render:function(e,t){return Object(U.jsx)(h.c,{columns:[],value:e.CItemCode,onClick:function(){Se(!0),ue(e)},onBlurDiv:function(){return null},lookupOpen:he,rows:[]})}},{title:"Item",field:"CItemName",cellStyle:{width:"20%"},render:function(e,t){return Object(U.jsx)("p",{children:e.CItemName})}},{title:"UOM",field:"UOMCode",cellStyle:{width:"20%"},render:function(e){return Object(U.jsx)(h.c,{columns:[],value:e.UOMCode,onClick:function(){Me(!0),ue(e)},onBlurDiv:function(){return null},lookupOpen:!1,rows:[]})}},{title:"Quantity",field:"Quantity",cellStyle:{width:"20%"},render:function(e){return Object(U.jsx)(h.f,{placeholder:"0.00",symbolIcon:"",thousandSeparator:!0,disabled:!1,value:1===e.Quantity?"":e.Quantity,Change:function(t){return Dt(Number(t.target.value.replace(/,/gi,"").split(e.Symbol).join("")),e,"Quantity")}})}},{title:"Stage",field:"StageName",cellStyle:{width:"20%"},render:function(e){return Object(U.jsx)(h.c,{columns:[],value:e.StageName,onClick:function(){we(!0),ue(e)},onBlurDiv:function(){return null},lookupOpen:Ne,rows:[]})}}],rows:[]}),Ge=Object(r.a)(Ke,2),Xe=Ge[0],Ye=Ge[1],Ze=Object(s.useState)({registerNotOpen:!1,newList:!1,viewList:!1,editList:!1}),$e=Object(r.a)(Ze,2),et=$e[0],tt=$e[1],at=Object(s.useState)({rows:[],columns:[]}),nt=Object(r.a)(at,2),ot=(nt[0],nt[1]),it=Object(s.useState)({columns:[],rows:[]}),ct=Object(r.a)(it,2),rt=ct[0],st=ct[1],ut=Object(s.useState)({}),lt=Object(r.a)(ut,2),dt=(lt[0],lt[1]),Ot=Object(s.useState)({columns:[],rows:[]}),bt=Object(r.a)(Ot,2),jt=bt[0],mt=bt[1],pt=Object(s.useState)({columns:[{title:"Machine Code",field:"MachineCode",cellStyle:{border:"1px solid #ccc8c8",paddingTop:1,paddingBottom:1,width:"35%"},headerStyle:{border:"1px solid #ccc8c8",fontWeight:"bolder",background:"#e3dede",paddingTop:1,width:"35%"}},{title:"Machine Name",field:"MachineName",cellStyle:{border:"1px solid #ccc8c8",paddingTop:1,paddingBottom:1,width:"35%"},headerStyle:{border:"1px solid #ccc8c8",fontWeight:"bolder",background:"#e3dede",paddingTop:1,width:"35%"}}],rows:[{MachineCode:"001",MachineName:"Sweing Machine"},{MachineCode:"002",MachineName:"Washing Machine"},{MachineCode:"003",MachineName:"Dry Machine"}]}),gt=Object(r.a)(pt,2),ft=(gt[0],gt[1],Object(s.useState)({columns:[],rows:[]})),ht=Object(r.a)(ft,2),St=ht[0],Ct=ht[1];Object(s.useEffect)((function(){}),[]);var vt=function(){je(Object(S.e)("FormName=".concat("Items")))};Object(s.useEffect)((function(){pe.error&&je(Object(S.n)()),pe.lookupData&&(!0===pe.lookupData.Success&&st(pe.lookupData.Message.MO),je(Object(S.o)())),pe.lookupData2&&(!0===pe.lookupData2.Success&&mt(pe.lookupData2.Message.RoutingStages),je(Object(S.p)())),pe.lookupData3&&(!0===pe.lookupData3.Success&&(T=pe.lookupData3.Message.MOStages,Ye((function(e){return Object(c.a)(Object(c.a)({},e),{},{rows:pe.lookupData3.Message.MOStages})}))),je(Object(S.q)())),pe.lookupDataInventory&&(!0===pe.lookupDataInventory.Success&&Ct(pe.lookupDataInventory.Message.Location),je(Object(S.r)())),pe.lookupDataInventory1&&(!0===pe.lookupDataInventory1.Success&&ot(pe.lookupDataInventory1.Message.Item),je(Object(S.s)())),pe.lookupDataInventory2&&(!0===pe.lookupDataInventory2.Success&&dt(pe.lookupDataInventory2.Message.ItemUOM),je(Object(S.t)()))}),[pe]),Object(s.useEffect)((function(){me.error?je(Object(S.m)()):me.createOrUpdateData?(!0===me.createOrUpdateData.Success?tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{open:!0,severity:"success",msg:me.createOrUpdateData.Message,registerNotOpen:!1})})):tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{open:!0,severity:"error",msg:me.createOrUpdateData.Message,registerNotOpen:!0})})),je(Object(S.m)())):null!==me&&void 0!==me&&me.singleList&&(!0===(null===me||void 0===me?void 0:me.singleList.Success)?(Je(me.singleList.Message.Header),Ye((function(e){return Object(c.a)(Object(c.a)({},e),{},{rows:me.singleList.Message.Detail})})),T=me.singleList.Message.Detail):tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{open:!0,severity:"error",msg:me.singleList.Message,registerNotOpen:!0})})),je(Object(S.m)()))}),[me]);var Mt=function(){je(Object(S.d)("FormName=".concat("Locations"))),je(Object(S.i)("FormName=ActiveMO"))},yt=function(e){var t="FormName=".concat(I,"&TransNo=").concat(e.TransNo);je(Object(S.j)(t))},xt=function(e){je(Object(S.g)("FormName=".concat("RoutingStages","&RoutingCode=",e)))},Nt=function(e){je(Object(S.f)("FormName=".concat("ItemUOM","&ItemCode=",e)))},wt=function(){return""===We.Location||void 0===We.Location||null===We.Location?(tt({open:!0,severity:"error",msg:"Location Code is Empty! ",registerNotOpen:!0}),!1):""===We.MOTransNo||void 0===We.MOTransNo||null===We.MOTransNo?(tt({open:!0,severity:"error",msg:"MO Number is Empty! ",registerNotOpen:!0}),!1):0===We.Item||void 0===We.Item||null===We.Item?(tt({open:!0,severity:"error",msg:"Item Name is Empty! ",registerNotOpen:!0}),!1):""===We.UOM||void 0===We.UOM||null===We.UOM?(tt({open:!0,severity:"error",msg:"UOM is Empty! ",registerNotOpen:!0}),!1):""===We.StageName||void 0===We.StageName||null===We.StageName?(tt({open:!0,severity:"error",msg:"Stage Name is Empty! ",registerNotOpen:!0}),!1):""===We.MachineName||void 0===We.MachineName||null===We.MachineName?(tt({open:!0,severity:"error",msg:"Machine Name is Empty! ",registerNotOpen:!0}),!1):""===We.UnitStarted||void 0===We.UnitStarted||null===We.UnitStarted?(tt({open:!0,severity:"error",msg:"Start Units  are Empty! ",registerNotOpen:!0}),!1):""===We.UnitsProduced||void 0===We.UnitsProduced||null===We.UnitsProduced?(tt({open:!0,severity:"error",msg:"Produced Units  are Empty! ",registerNotOpen:!0}),!1):!(kt().length>0)||(tt({open:!0,severity:"error",msg:"Please Completely fill Rows! "}),!1)},kt=function(){return Xe.rows.filter((function(e,t){return""===e.StageCode||""===e.CItemCode||""===e.UOM||""===e.Quantity||""===e.StageName}))},Lt=function(){tt(Object(c.a)(Object(c.a)({},et),{},{open:!1}))},Ut=function(e,t){n=t,D=!1,We[e]=t,Je(Object(c.a)({},We))},It=function(e,t,a){e.target.value;if("Location"==a&&(Je((function(e){return Object(c.a)(Object(c.a)({},e),{},{Location:t.Location,LocationCode:t.LocationCode})})),A(!1)),"MONumber"==a&&(Je((function(e){return Object(c.a)(Object(c.a)({},e),{},Object(o.a)({Item:t.Item,ItemCode:t.ItemCode,MOID:t.MOID,MOStatus:t.MOStatus,RoutingName:t.RoutingName,RoutingCode:t.RoutingCode,MOTransNo:t.TransNo,UOM:t.UOM,UOMCode:t.UOMCode,Quantity:t.Quantity,UnitQuantity:t.UnitQuantity,BaseQuantity:t.BaseQuantity},"Quantity",t.Quantity))})),je(Object(S.g)("FormName=".concat("RoutingStages","&RoutingCode=",t.RoutingCode))),W(!1)),"Stage"==a&&(Je(Object(c.a)(Object(c.a)({},We),{},{StageName:t.StageName,StageCode:t.StageCode,MachineName:t.MachineName,MachineCode:t.MachineCode})),je(Object(S.h)("FormName=".concat("MOStages","&MOID=",We.MOID,"&StageCode=").concat(t.StageCode))),X(!1)),"Machine"==a&&(Je(Object(c.a)(Object(c.a)({},We),{},{MachineName:t.MachineName,MachineCode:t.MachineCode})),$(!1)),"ItemLookUp"===a){var n=T,i=n.indexOf(se);n[i].CItemCode=t.ItemCode,n[i].CItemName=t.Item,console.log({rowData:t}),Nt(t.ItemCode),Se(!1),Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:n}))}if("UOMLookUp"===a){var r=T,s=r.indexOf(se);r[s].UOMCode=t.UOMCode,r[s].UOM=t.UOMCode,r[s].UnitQuantity=t.UnitQuantity,Me(!1),Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:r}))}if("StageLookUp"===a){var u=T,l=u.indexOf(se);u[l].StageCode=t.StageCode,u[l].StageName=t.StageName,u[l].MachineName=t.MachineName,u[l].MachineCode=t.MachineCode,u[l].StageSeq=t.StageSeq,we(!1),Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:u}))}},Dt=function(e,t,a){var n=T,o=n.indexOf(t);n[o][a]=e;var i=n[o].UnitQuantity*n[o].Quantity;n[o].BaseQuantity=i,Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:n})),T=n};return Object(s.useEffect)((function(){console.log("jaasa ");var e=We.StartTime,t=We.EndTime,a=l()(t,"HH:mm").diff(l()(e,"HH:mm")),n=l.a.duration(a),o=n.hours(),i=n.minutes();console.log({Hours:o}),console.log({minutes:i}),-1===Math.sign(parseFloat(o))&&(o+=24),-1===Math.sign(parseFloat(i))&&(i+=60),o<10&&(o="0".concat(o)),i<10&&(i="0".concat(i)),Je(Object(c.a)(Object(c.a)({},We),{},{TotalHours:"".concat(o,":").concat(i)}))}),[We.StartTime,We.EndTime]),Object(U.jsx)(U.Fragment,{children:!0===et.registerNotOpen?Object(U.jsxs)(U.Fragment,{children:[Object(U.jsxs)(d.a,{container:!0,justify:"center",children:[Object(U.jsx)(d.a,{item:!0,xs:12,children:Object(U.jsx)(h.d,{property:et,close:Lt,onClick:Lt})}),Object(U.jsx)(d.a,{item:!0,xs:12,children:Object(U.jsxs)(y.a,{children:[Object(U.jsx)(L.a,{children:Object(U.jsx)(O.a,{children:Object(U.jsx)(d.a,{container:!0,alignItems:"center",justifyContent:"space-between",children:Object(U.jsx)(d.a,{item:!0,children:Object(U.jsx)(k.a,{goBack:function(){tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{registerNotOpen:!1})}))},clearAll_OnClick:function(){Je(Object(c.a)(Object(c.a)({},We),{},{TransDate:new Date,TransNo:"",TransType:"PCK",ItemCode:"",Item:"",UOMCode:"",UOM:"",UnitQuantity:0,Quantity:0,BaseQuantity:0,StartTime:"00:00",EndTime:"00:00",TotalHours:0,UnitStarted:0,UnitsProduced:0,RequireQC:0}))},clearAll:et.newList,saveAndClose:et.viewList,saveAndClose_OnClick:function(){saveAndClose()},FormID:1,submitButton:et.viewList,SaveButton:et.viewList,Button2:!et.newList,submit:!et.viewList,SaveButton_OnClick:function(){return function(){if(wt()){var e={FormName:I,Header:We,Detail:Xe.rows};je(Object(S.a)(e)),console.log({payload:e})}}()},submitButton_OnClick:function(){return postAndSave()},Button2_OnClick:function(){return printVoucher()}})})})})}),Object(U.jsx)(b.a,{}),Object(U.jsx)(j.a,{children:Object(U.jsxs)(d.a,{container:!0,justify:"center",children:[Object(U.jsx)(d.a,{item:!0,xs:7,children:Object(U.jsxs)(d.a,{container:!0,spacing:2,justify:"center",children:[Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.g,{value:We.TransNo,id:"TransNo",disabled:!0,label:"Pick Number"})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.e,{id:"PickDate",label:"Pick Date*",value:We.TransDate,Change:function(e){return Je(Object(c.a)(Object(c.a)({},We),{},{TransDate:e}))},disabled:et.viewList})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.c,{disabled:et.viewList,label:"Location*",reference:"Location",onClick:function(){return A(!0)},lookupOpen:V,columns:St.columns,rows:Ae?Oe:St.rows,onBlurDiv:function(){return A(!1)},onFocus:function(){return ne(!1)},onBlur:function(e){setTimeout((function(){qe(!1),Object(M.a)({setProperty:tt,property:et,Header:We,setHeader:Je,selectLookupVal:ae,lookupSelectRow:D},n,St.rows,["LocationCode","Location"],["Code","Description"],"Location Code"),A(!1)}),200)},changeLookupVal:Ut,propertyName:"Location",listForSearch:null===St||void 0===St?void 0:St.rows,setSearchRowProp:function(e){be(e)},setFilterProp:function(e){return qe(e)},setLookupEnable:function(){return tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{bomCodeLookUp:!0})}))},value:We.Location,lookupValuesList:["LocationCode","Location"],setLookUpData:function(e,t){return It(e,t,"Location")}})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.c,{label:"MO Number*",reference:"MO Number",onClick:function(){return W(!0)},lookupOpen:z,disabled:et.viewList,columns:rt.columns,rows:Ae?Oe:rt.rows,onBlurDiv:function(){return W(!1)},onFocus:function(){return ne(!1)},onBlur:function(e){setTimeout((function(){qe(!1),Object(M.a)({setProperty:tt,property:et,Header:We,setHeader:Je,selectLookupVal:ae,lookupSelectRow:D},n,rt.rows,["Mo Number","Mo, Date, Item Code"],["Code","Description, Item"],"MO Number"),W(!1)}),200)},changeLookupVal:Ut,propertyName:"MOTransNo",listForSearch:null===rt||void 0===rt?void 0:rt.rows,setSearchRowProp:function(e){be(e)},setFilterProp:function(e){return qe(e)},setLookupEnable:function(){return tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{bomCodeLookUp:!0})}))},value:We.MOTransNo,lookupValuesList:["MO Mumber","MO Date","Item Code"],setLookUpData:function(e,t){return It(e,t,"MONumber")}})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.g,{value:We.Item,disabled:!0,label:"Item Name"})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.g,{label:"UOM",value:We.UOM,Change:function(e){return Je(Object(c.a)(Object(c.a)({},We),{},{UOM:e.target.value}))},disabled:!0})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.g,{label:"Routing",value:We.RoutingName,disabled:!0})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.f,{label:"MO Quantity",value:We.Quantity,symbol:!1,Change:function(e){return Je(Object(c.a)(Object(c.a)({},We),{},{Quantity:e.target.value}))},disabled:!0})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.c,{disabled:et.viewList,label:"Stage*",reference:"stage",onClick:function(){return X(!0)},lookupOpen:G,columns:jt.columns,rows:Ae?Oe:jt.rows,onBlurDiv:function(){return X(!1)},onFocus:function(){return ne(!1)},onBlur:function(e){setTimeout((function(){qe(!1),Object(M.a)({setProperty:tt,property:et,Header:We,setHeader:Je,selectLookupVal:ae,lookupSelectRow:D},n,jt.rows,["StageCode","StageName"],["Code","Description"],"Stage"),X(!1)}),200)},changeLookupVal:Ut,propertyName:"StageName",listForSearch:null===jt||void 0===jt?void 0:jt.rows,setSearchRowProp:function(e){be(e)},setFilterProp:function(e){return qe(e)},setLookupEnable:function(){return tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{StageCodeLookUp:!0})}))},value:We.StageName,lookupValuesList:["Stage Code","StageName"],setLookUpData:function(e,t){return It(e,t,"Stage")}})}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(h.g,{label:"Machine",value:We.MachineName,disabled:!0})}),Object(U.jsx)(d.a,{item:!0,xs:2}),Object(U.jsx)(d.a,{item:!0,xs:2})]})}),Object(U.jsx)(d.a,{item:!0,xs:1}),Object(U.jsx)(d.a,{item:!0,xs:4,children:Object(U.jsx)(x.a,{sx:{mx:0,mb:0,bgcolor:"dark"===t.palette.mode?t.palette.dark.main:t.palette.primary.light},children:Object(U.jsxs)(d.a,{container:!0,spacing:2,justify:"center",style:{paddingBottom:10},children:[Object(U.jsx)(d.a,{item:!0,xs:6,children:Object(U.jsx)(h.h,{label:"Start Time",width:120,value:We.StartTime,disabled:p,Change:function(e){return Je(Object(c.a)(Object(c.a)({},We),{},{StartTime:e.target.value}))}})}),Object(U.jsx)(d.a,{item:!0,xs:6,children:Object(U.jsx)(h.h,{label:"End Time",width:120,value:We.EndTime,disabled:p,Change:function(e){return Je(Object(c.a)(Object(c.a)({},We),{},{EndTime:e.target.value}))}})}),Object(U.jsx)(d.a,{item:!0,xs:12,children:Object(U.jsx)(h.g,{label:"Total Hours",value:We.TotalHours,symbol:!1,disabled:!0})}),Object(U.jsx)(d.a,{item:!0,xs:6,children:Object(U.jsx)(h.f,{label:"Units Started",value:We.UnitStarted,Change:function(e){Je((function(t){return Object(c.a)(Object(c.a)({},t),{},{UnitStarted:e.target.value})}))},symbol:!1})}),Object(U.jsx)(d.a,{item:!0,xs:6,children:Object(U.jsx)(h.f,{label:"Units Produced",Change:function(e){Je((function(t){return Object(c.a)(Object(c.a)({},t),{},{UnitsProduced:e.target.value})}))},value:We.UnitsProduced,symbol:!1})})]})})})]})})]})})]}),Object(U.jsx)("br",{}),Object(U.jsx)(g.a,{style:{padding:"10px"},title:Object(U.jsx)("div",{children:Object(U.jsx)(m.a,{variant:"text",onClick:function(){return function(){var e=Object(i.a)(Xe.rows);e.push(Object(c.a)({},{CItemCode:"",CItemName:"",UOMCode:"",CStatus:0,UOM:"",UnitQuantity:1,Quantity:1,BaseQuantity:1,StageCode:"",StageName:"",MachineName:"",MachineCode:"",StageSeq:""})),T=e,Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:e}))}()},children:"+ Add Item"})}),columns:Xe.columns,data:Xe.rows,options:{showTitle:!0!==et.viewList,paging:!1,actionsColumnIndex:-1,pageSize:5,pageSizeOptions:[5,10,20,30],search:!1,loadingType:"linear",headerStyle:{fontWeight:"bold",paddingLeft:"10px",paddingRight:"0px",paddingTop:"0px",paddingBottom:"0px",textAlign:"left"},actionsCellStyle:{justifyContent:"center",alignItems:"center",width:20}},actions:[function(e){return{icon:function(){return Object(U.jsx)(v.a,{sx:{color:w.a[500]},style:{height:"1em",width:"1em"}})},tooltip:"Delete",onClick:function(e){!function(e){var t=Object(i.a)(Xe.rows),a=t.indexOf(e);t.splice(a,1),Ye(Object(c.a)(Object(c.a)({},Xe),{},{rows:t}))}(e)}}}],localization:{body:{emptyDataSourceMessage:"No records to display",filterRow:{filterTooltip:"Filter"}}}})]}):Object(U.jsx)(U.Fragment,{children:Object(U.jsx)(h.k,{Details:"",FormName:I,props:e,dialog:!0,AddData:function(e){vt(),Mt(),tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{registerNotOpen:!0,newList:!0,editList:!1,viewList:!1})})),Je((function(e){return Object(c.a)(Object(c.a)({},e),{},{TransDate:new Date,TransNo:"",TransType:"PCK",MOTransNo:"",ItemCode:"",Item:"",MOID:"",UOMCode:"",UOM:"",UnitQuantity:"",BaseQuantity:"",RoutingCode:"",RoutingName:"",LocationCode:"",Location:"",StageCode:"",StageName:"",MachineName:"",MachineCode:"",StartTime:"00:00",EndTime:"00:00",TotalHours:"00:00",UnitStarted:"",UnitsProduced:"",RequireQC:!1})})),Ye((function(e){return Object(c.a)(Object(c.a)({},e),{},{rows:[]})}))},EditData:function(e){vt(),Mt(),Nt(e.ItemCode),xt(e.RoutingCode),yt(e),tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{viewList:!1,newList:!1,editList:!0,registerNotOpen:!0})}))},payload:Ue,saveFunction:Te,SetRowDataID:function(e){F(e.ShiftHead)},setLoadingOnSave:He,ID:Pe,FormCode:"BOMID",ViewData:function(e){tt((function(e){return Object(c.a)(Object(c.a)({},e),{},{registerNotOpen:!0,viewList:!0,editList:!1,newList:!1})})),yt(e),C(!0)},FormID:I,type:"JV",postingIcons:!1,isEditButton:!0})})})}},780:function(e,t,a){"use strict";var n=a(0),o=a.n(n),i=a(51),c=a(719),r=a(1445),s=a(66);t.a=function(e){var t=e.children,a=e.window,n=Object(i.a)(),u=Object(c.a)(n.breakpoints.down("lg")),l=Object(s.e)((function(e){return e.menu})).drawerOpen,d=u?80:83,O=u?38:41,b=u?38:l?281:42,j=Object(r.a)({disableHysteresis:!0,threshold:180,target:a||void 0}),m="dark"===n.palette.mode?n.palette.dark.dark:n.palette.grey[200];return o.a.cloneElement(t,{style:{backgroundColor:n.palette.background.default,zIndex:1099,borderTop:j?"1px solid":"none",borderBottom:j?"1px solid":"none",borderColor:j?m:"",position:j?"fixed":"relative",top:j?d:"auto",right:j?O:"auto",left:j?b:"auto"}})}},781:function(e,t,a){"use strict";a.d(t,"a",(function(){return o}));var n=a(4);function o(e,t,a,o,i,c,r,s){if(!1===e.lookupSelectRow){if(void 0!==t&&(t=t.toLowerCase(),!e.selectLookupVal)){var u=a.filter((function(e,a){return e[i[0]].toString().toLowerCase().indexOf(t)>-1||e[i[1]].toString().toLowerCase().indexOf(t)>-1}));if(0===u.length&&t){e.setProperty((function(e){return Object(n.a)(Object(n.a)({},e),{},{open:!0,severity:"error",msg:"Invalid ".concat(c)})}));for(var l=0;l<o.length;l++)e.Header[o[l]]="",e.setHeader(Object(n.a)({},e.Header));console.log({Header:e.Header})}else if(u.length&&t)if(r)switch(c){case"Customers":s(null,u[0],"Customers");break;case"Item":s(null,u[0],"Item");break;case"Routing":s(null,u[0],"Routing");break;default:s("donor",u[0],o,i)}else{for(var d=0;d<o.length;d++)e.Header[o[d]]=u[0][i[d]],e.setHeader(Object(n.a)({},e.Header));"Bank"===c&&s(u[0])}}if(""===t)for(var O=0;O<o.length;O++)e.Header[o[O]]="",e.setHeader(Object(n.a)({},e.Header))}}}}]);
//# sourceMappingURL=11.199f0396.chunk.js.map