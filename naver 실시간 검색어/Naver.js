  // =============================================================
  // �� �� : ���̹� �ǽð� �α� �˻��� ���� script  
  // �� �� : ���̹� �ǽð� �α� �˻��� ����
  //         �������ް� �ƴϱ� ������, 1�� 25000ȸ ����
  // =============================================================

  // Naver OpenAPI �ǽð� �α� �˻��� Start
  var requestUrl = "http://openapi.naver.com/search?key=d5a6b197db5d4823179a39c34e668b03&query=nexearch&target=rank"; // key�� ���̹��� ����ؼ� ������ �ȴ�.
																					//���� key d5a6b197db5d4823179a39c34e668b03 
  var searchUrl = "http://search.naver.com/search.naver?where=nexearch&query=";
  var responseProcess = 'mainControl';
  var ImageUrl = "./images/realrank/" 
        
  // �ǽð� �α� �˻��� ������ ��û     
  xmlHttpPost(requestUrl, responseProcess);
  
  // Response Data ó�� �Լ�
  function mainControl(xmlHttp)
  {
    var result = xmlHttp.getElementsByTagName("result");
    var htmlDiv = document.getElementById("list"); // list element ��������
    var childInfo = result[0].childNodes[0]; // item elemeent ��������   
    var startHtml = '<table width="132" cellspacing="0" cellpadding="0" border="0" style="font-face:����; font-size:9pt; margin:2px 0 0 6px">';
    var endHtml = '</table>';
    var strHtml = '';
	var resultNum = 5;

    for(var idx=0; idx<5; idx++) //for(var idx=0; idx<childInfo.childNodes.length; idx++)
    {
      var childNode = childInfo.childNodes[idx]; // item child element ��������(R1, R2...R10)
      
      // R1, R2�� child element ��������
      if(childNode.childNodes[0].tagName == "K")
        var dataK = childNode.childNodes[0].firstChild.nodeValue;     
      if(childNode.childNodes[1].tagName == "S")
        var dataS = childNode.childNodes[1].firstChild.nodeValue;             
      if(childNode.childNodes[2].tagName == "V")
        var dataV = childNode.childNodes[2].firstChild.nodeValue;
      
      // XML ������ Display html�� ��ȯ�ϱ�
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
           
      // ���⿵�� ����
      var divElement = document.createElement("div");
      htmlDiv.appendChild(divElement);
      
      // html ������ ����
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
    
    // div������ html ����
    divElement.innerHTML = startHtml + strHtml + endHtml;   
  }
  
  // XML Request �Լ�
  function xmlHttpPost(actionUrl, resultFunction)
  {
    var xmlHttpRequest = false;
    
    //IE�ΰ��
    if(window.ActiveXObject)
      xmlHttpRequest = new ActiveXObject('Msxml2.XMLHTTP');
    else    
      xmlHttpRequest = new ActiveXObject('Microsoft.XMLHTTP');  

    // Send ����  
    xmlHttpRequest.open('GET', actionUrl, true);
    xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.onreadystatechange = function() 
    {
    if(xmlHttpRequest.readyState == 4)
    {
      switch (xmlHttpRequest.status)
      {
        case 404:
           alert('����: ' + actionUrl + '�� �������� ����');
           break;
        case 500:
           alert('����: ' + xmlHttpRequest.responseXML);
           break;
        default:
           response = xmlHttpRequest.responseXML;
           eval(resultFunction + '(response);');
           break;
      }
    }
   }
   
   // Request ��û
   xmlHttpRequest.send();
  }