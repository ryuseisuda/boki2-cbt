/* ボキイヌ Service Worker: Web Push受信用 */
self.addEventListener("install",e=>{self.skipWaiting();});
self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim());});
self.addEventListener("push",e=>{
  let d={};
  try{d=e.data?e.data.json():{};}catch(err){d={body:e.data?e.data.text():""};}
  const title=d.title||"ボキイヌ";
  const opts={
    body:d.body||"きょうの1問、といていこう🐶",
    icon:"/boki2-cbt/icon-192.png",
    badge:"/boki2-cbt/icon-192.png",
    data:{url:d.url||"/boki2-cbt/"},
    tag:d.tag||"bokiinu-daily"
  };
  e.waitUntil(self.registration.showNotification(title,opts));
});
self.addEventListener("notificationclick",e=>{
  e.notification.close();
  const url=(e.notification.data&&e.notification.data.url)||"/boki2-cbt/";
  e.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
    for(const c of list){if(c.url.indexOf("/boki2-cbt")>=0&&"focus" in c)return c.focus();}
    return clients.openWindow(url);
  }));
});
