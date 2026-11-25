// 화요책방 서비스 워커 — 바로가기(앱) 설치용. 화면은 항상 인터넷에서 새로 받고(캐시 안 함), 인터넷이 끊겼을 때만 안내를 보여 줌
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;  // 페이지 열기만 다룸(GitHub 저장·스캔본 받기는 손대지 않음)
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>화요책방</title><body style="font-family:sans-serif;padding:40px;text-align:center;color:#1f2430"><h2>화요책방</h2><p>인터넷에 연결되어 있지 않아요.<br>연결된 뒤 다시 열어 주세요.</p></body>',
    { headers: { 'content-type': 'text/html; charset=utf-8' } })));
});
