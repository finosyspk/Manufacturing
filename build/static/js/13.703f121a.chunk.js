(this["webpackJsonpberry-material-react"]=this["webpackJsonpberry-material-react"]||[]).push([[13],{1447:function(e,t,a){"use strict";a.r(t);var i=a(4),s=a(14),c=a(0),n=a(153),o=a(765),r=(a(738),a(178)),l=(a(903),a(63)),d=a(763),j=a(698),u=(a(962),a(745)),g=a(1);t.default=function(){var e,t,a=Object(c.useState)(!1),b=Object(s.a)(a,2),O=(b[0],b[1]),v=Object(c.useState)(!1),m=Object(s.a)(v,2),S=(m[0],m[1],Object(c.useState)(!1)),f=Object(s.a)(S,2),p=(f[0],f[1],Object(c.useState)(!1)),x=Object(s.a)(p,2),C=(x[0],x[1]),N=Object(c.useState)({open:!1,severity:"",msg:"",viewList:!1,editList:!1,addList:!0}),h=Object(s.a)(N,2),L=h[0],w=h[1],D=Object(c.useState)({StageCode:"",StageName:"",IsActive:!0}),A=Object(s.a)(D,2),I=A[0],y=A[1];console.log("Header",I);var F=Object(c.useState)(""),M=Object(s.a)(F,2),k=M[0],B=M[1],E=Object(r.c)(),P=Object(r.d)((function(e){return e.AllActionsRes})),T=Object(r.d)((function(e){var t=e.AllActionsRes;return null===t||void 0===t?void 0:t.singleList}));console.log("SingleList",T);var U=function(){O(!1),y({StageCode:"",StageName:"",IsActive:!1,CreatedUser:"",ModifyUser:""}),w((function(e){return Object(i.a)(Object(i.a)({},e),{},{registerNotOpen:!1,viewList:!1,editList:!1,newList:!1})}))};Object(c.useEffect)((function(){P.error?E(Object(u.m)()):null!==P&&void 0!==P&&P.singleList&&!0===(null===P||void 0===P?void 0:P.singleList.Success)&&console.log({har:null===P||void 0===P?void 0:P.singleList})}),[null===P||void 0===P||null===(e=P.createOrUpdateData)||void 0===e?void 0:e.Message,null===P||void 0===P||null===(t=P.singleList)||void 0===t?void 0:t.Message]);var R=function(){var e={FormNameID:"Stages",FormCode:"StageCode",FormNameIDValue:I.StageCode};C(!0),E(Object(u.j)(e))},H=function(e,t){"clickaway"!==t&&w(Object(i.a)(Object(i.a)({},L),{},{open:!1}))};return Object(c.useEffect)((function(){P.error?E(Object(u.m)()):T&&null!==T&&void 0!==T&&T.Success&&y({StageCode:T.Message.StageCode,StageName:T.Message.StageName,IsActive:T.Message.IsActive,CreatedUser:"",ModifyUser:""})}),[null===T||void 0===T?void 0:T.Message]),Object(g.jsxs)(g.Fragment,{children:[Object(g.jsxs)(j.a,{container:!0,children:[Object(g.jsx)(j.a,{item:!0,xs:12,children:Object(g.jsx)(d.d,{property:L,close:H,onClick:H})}),Object(g.jsx)(d.k,{Details:"Bill Of Material List",FormName:"Stages",dialog:!0,DialogClose:U,AddData:function(){O(!0),w((function(e){return Object(i.a)(Object(i.a)({},e),{},{registerNotOpen:!0,editList:!1,newList:!0,viewList:!1})})),y((function(e){return Object(i.a)(Object(i.a)({},e),{},{StageCode:"",StageName:"",IsActive:!0})}))},EditData:function(e){y(e),w((function(e){return Object(i.a)(Object(i.a)({},e),{},{registerNotOpen:!0,viewData:!1,editList:!0,newData:!1})}))},FormCode:"StageCode",SetRowDataID:function(e){B(e.StageCode)},hideDialog:U,ID:k,ViewData:function(e){y(e),w((function(e){return Object(i.a)(Object(i.a)({},e),{},{registerNotOpen:!0,editList:!1,newList:!1,viewList:!0})}))},FormID:"Stages",isEditButton:!0})]}),Object(g.jsx)(o.a,{maxWidth:"md",Title:"Production Stage",IsOpen:L.registerNotOpen,Close:U,Body:Object(g.jsx)(g.Fragment,{children:Object(g.jsx)(j.a,{container:!0,spacing:l.b,children:Object(g.jsx)(j.a,{item:!0,xs:12,children:Object(g.jsx)(n.a,{children:Object(g.jsxs)(j.a,{container:!0,spacing:2,alignItems:"center",children:[Object(g.jsx)(j.a,{item:!0,xs:8,children:Object(g.jsx)(d.g,{iserror:L.open,label:"Production Code",type:"text",value:I.StageCode,helperText:L.msg,disabled:L.viewList||L.editList,Change:function(e){return y(Object(i.a)(Object(i.a)({},I),{},{StageCode:e.target.value}))},Blur:R})}),Object(g.jsx)(j.a,{item:!0,xs:1}),Object(g.jsx)(j.a,{item:!0,xs:3,children:Object(g.jsx)(d.a,{label:"Is Active",disabled:L.viewList,checked:I.IsActive,Change:function(e){return y(Object(i.a)(Object(i.a)({},I),{},{IsActive:e.target.checked}))}})}),Object(g.jsx)(j.a,{item:!0,xs:12,children:Object(g.jsx)(d.g,{iserror:!1,label:"Production Description",type:"text",value:I.StageName,helperText:"Please enter Production Description",disabled:L.viewList,Change:function(e){return y(Object(i.a)(Object(i.a)({},I),{},{StageName:e.target.value}))},Blur:R})})]})})})})}),Save:function(){if(""===I.StageCode||void 0===I.StageCode||null===I.StageCode?(w({open:!0,severity:"error",msg:"Empty Code Not Allowed",registerNotOpen:!0}),0):""!==I.StageName&&void 0!==I.StageName&&null!==I.StageName||(w({open:!0,severity:"error",msg:"Empty Stage Name Not Allowed",registerNotOpen:!0}),0)){var e={FormName:"Stages",Header:I};E(Object(u.a)(e)),w((function(e){return Object(i.a)(Object(i.a)({},e),{},{registerNotOpen:!1})}))}},ButtonTitle1:"Save",ButtonTitle2:"Cancel"})]})}},962:function(e,t,a){"use strict";var i=a(22),s=a(21),c=a(47),n=a(48),o=a(0),r=a(1033),l=a(738),d=a.n(l),j=a(1);o.Component}}]);
//# sourceMappingURL=13.703f121a.chunk.js.map