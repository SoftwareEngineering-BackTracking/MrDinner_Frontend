function setCookie(cookie_name, value, miuntes) {
  var exdate = new Date();
  exdate.setMinutes(exdate.getMinutes() + miuntes);
  // 설정 시간(분 단위)만큼 현재시간에 만료값으로 지정

  const cookie_value = escape(value) + ((miuntes == null) ? '' : '; expires=' + exdate.toUTCString());
document.cookie = cookie_name + '=' + cookie_value;
}

function getCookie(cookie_name) {
  var x, y;
  var val = document.cookie.split(';');
  for (var i = 0; i < val.length; i++) {
      x = val[i].substr(0, val[i].indexOf('='));
      y = val[i].substr(val[i].indexOf('=') + 1);
      x = x.replace(/^\s+|\s+$/g, '');
      // 앞과 뒤의 공백 제거하기
      if (x == cookie_name) {
          return unescape(y);
          // unescape로 디코딩 후 값 리턴
      }
  }
}

function allDelCookies(domain, path){
  // const doc = document;
  domain = domain || document.domain;
  path = path || '/';

  const cookies = document.cookie.split('; '); // 배열로 반환
  console.log(cookies);
  const expiration = 'Sat, 01 Jan 1972 00:00:00 GMT';

  // 반목문 순회하면서 쿠키 전체 삭제
  if (!document.cookie) {
    alert('삭제할 쿠키가 없습니다.');
  } else {
    for (i = 0; i < cookies.length; i++) {
      // const uname = cookies[i].split('=')[0];
      // document.cookie = `${uname}=; expires=${expiration}`;
      document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration;
      // document.cookie = cookies[i].split('=')[0] + '=; expires=' + expiration + '; domain =' + domain;
    }
    alert('쿠키 전부 삭제완료!!');
  }
};

function go_signup(){
  if (getCookie('isLoggedin') != 'true'){
    location.href = 'login.html';
  } else{
    alert('이미 로그인 상태입니다.');
  }
};