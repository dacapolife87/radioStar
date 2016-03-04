  // =============================================================
  // 목 적 : 네이버 실시간 인기 검색어 노출 script  
  // 설 명 : 네이버 실시간 인기 검색어 노출
  //         업무제휴가 아니기 때문에, 1일 25000회 제한
  // =============================================================

  // Naver OpenAPI 실시간 인기 검색어 Start
  var requestUrl = "http://openapi.naver.com/search?key=d5a6b197db5d4823179a39c34e668b03&query=nexearch&target=rank"; // key는 네이버에 등록해서 받으면 된다.
																					//현재 key d5a6b197db5d4823179a39c34e668b03 
  var searchUrl = "http://search.naver.com/search.naver?where=nexearch&query=";
  var responseProcess = 'mainControl';
  var ImageUrl = "./images/realrank/" 
        
  // 실시간 인기 검색어 데이터 요청     
  xmlHttpPost(requestUrl, responseProcess);
  
  // Response Data 처리 함수
  function mainControl(xmlHttp)
  {
    var result = xmlHttp.getElementsByTagName("result");
    var htmlDiv = document.getElementById("list"); // list element 가져오기
    var childInfo = result[0].childNodes[0]; // item elemeent 가져오기   
    var startHtml = '<table width="132" cellspacing="0" cellpadding="0" border="0" style="font-face:돋움; font-size:9pt; margin:2px 0 0 6px">';
    var endHtml = '</table>';
    var strHtml = '';
	var resultNum = 5;

    for(var idx=0; idx<5; idx++) //for(var idx=0; idx<childInfo.childNodes.length; idx++)
    {
      var childNode = childInfo.childNodes[idx]; // item child element 가져오기(R1, R2...R10)
      
      // R1, R2의 child element 가져오기
      if(childNode.childNodes[0].tagName == "K")
        var dataK = childNode.childNodes[0].firstChild.nodeValue;     
      if(childNode.childNodes[1].tagName == "S")
        var dataS = childNode.childNodes[1].firstChild.nodeValue;             
      if(childNode.childNodes[2].tagName == "V")
        var dataV = childNode.childNodes[2].firstChild.nodeValue;
      
      // XML 데이터 Display html로 변환하기
      if(dataK.length > 4)
        var sKeyword = '<a href="'+searchUrl+encodeURI(dataK)+'" target="_blank" style="color:#6D6D6D; text-decoration:none;">'+dataK.substr(0, 4)+'...</a>';
      else
        var sKeyword = '<a href="'+searchUrl+encodeURI(dataK)+'" target="_blank" style="color:#6D6D6D; text-decoration:none;">'+dataK+'</a>';
      var numImage = '<img src="'+ImageUrl+'num01_'+(idx+1)+'.jpg" alt="'+(idx+1)+'"/>';
      if(dataS == 'new')
        var imgState = 'new';
      else if(dataS == '+')
        var imgState = 'up';
	  else if(dataS == '-')
        var imgState = 'down';      
      else
        var imgState = 'same';
      var stateImage = '<img src="'+ImageUrl+'ico_'+imgState+'.bmp" alt="'+(idx+1)+'"/>';
           
      // 노출영역 생성
      var divElement = document.createElement("div");
      htmlDiv.appendChild(divElement);
      
      // html 데이터 생성
      strHtml += '<tr>';
      strHtml += '<td width="85" height="21">';
      strHtml += numImage + '&nbsp;' + sKeyword;
      strHtml += '</td>';
      strHtml += '<td width="25" align="center" valign="middle">';
      strHtml += stateImage;
      strHtml += '</td>';
      strHtml += '<td width="19" align="center" valign="middle">';
      strHtml += dataV;
      strHtml += '</td>';
      strHtml += '</tr>';
    }    
    
    // div영역에 html 삽입
    divElement.innerHTML = startHtml + strHtml + endHtml;   
  }
  
  // XML Request 함수
  function xmlHttpPost(actionUrl, resultFunction)
  {
    var xmlHttpRequest = false;
    
    //IE인경우
    if(window.ActiveXObject)
      xmlHttpRequest = new ActiveXObject('Msxml2.XMLHTTP');
    else    
      xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');  

    // Send 셋팅  
    xmlHttpRequest.open('GET', actionUrl, true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.onreadystatechange = function() 
    {
    if(xmlHttpRequest.readyState == 4)
    {
      switch (xmlHttpRequest.status)
      {
        case 404:
           alert('오류: ' + actionUrl + '이 존재하지 않음');
           break;
        case 500:
           alert('오류: ' + xmlHttpRequest.responseXML);
           break;
        default:
           response = xmlHttpRequest.responseXML;
           eval(resultFunction + '(response);');
           break;
      }
    }
   }
   
   // Request 요청
   xmlHttpRequest.send();
  }