package com.ai.school.gen;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;


import com.ai.school.pay.QueryResVo;
import com.ai.school.pay.SignPayResDetailVo;
import com.ai.school.pay.SignPayResVo;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;


public class XmlAnalyze {
	
	/**
	 * 支付通知报文解析
	 * @param payNotifyXml
	 * @return
	 * @throws Exception
	 */
    protected SignPayResVo getPayNotifyVo(String payNotifyXml) throws Exception{
    	
    	SignPayResVo vo = new SignPayResVo();
    	
	    Element rootEle = getDocumentElement(payNotifyXml);
	    
	    Element infoEle =  getElementByName(rootEle,"INFO");
	    vo.setPartnerId(getElementByName(infoEle,"PARTNER_ID").getTextContent());
	    vo.setSignedMsg(getElementByName(infoEle,"SIGNED_MSG").getTextContent());
	    
	    Element bodyEle = getElementByName(rootEle, "BODY");
	    Element  tradeDetailsEle = getElementByName(bodyEle, "TRADE_DETAILS");
	    NodeList transDetailEle = tradeDetailsEle.getElementsByTagName("TRANS_DETAIL");
	    
	    List<SignPayResDetailVo> details = new ArrayList<SignPayResDetailVo>();
	    
	    for(int i=0;i<transDetailEle.getLength();i++){
	    
	    	SignPayResDetailVo detail = new SignPayResDetailVo();
	    	
	    	Element transDetail = (Element)transDetailEle.item(i);
	    	
	    	detail.setTradeNo(getElementByName(transDetail,"TRADE_NO").getTextContent());
	    	detail.setPartnerTradeNo(getElementByName(transDetail,"PARTNER_TRADE_NO").getTextContent());
	    	detail.setResultCode(getElementByName(transDetail,"RESULT_CODE").getTextContent());
	    	detail.setAmount(Long.valueOf(getElementByName(transDetail,"AMOUNT").getTextContent()));
	    	detail.setDetailRemark(getElementByName(transDetail,"DETAIL_REMARK").getTextContent());
	    	detail.setAcctReservedField1(getElementByName(transDetail,"ACCT_RESERVED_FIELD1").getTextContent());
	    	detail.setAcctReservedField2(getElementByName(transDetail,"ACCT_RESERVED_FIELD2").getTextContent());
	    	detail.setAcctReservedField3(getElementByName(transDetail,"ACCT_RESERVED_FIELD3").getTextContent());
	    
	    	details.add(detail);
	    }
	    
	    vo.setDetail(details);
	    
    	return vo;
    }
    
    protected QueryResVo getQueryResVo(String queryResXml) throws Exception{
    	
    	QueryResVo vo = new QueryResVo();
    	
    	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    	
    	Element rootEle = getDocumentElement(queryResXml);
    	
    	Element infoEle =  getElementByName(rootEle,"INFO");
	    vo.setPartnerId(getElementByName(infoEle,"PARTNER_ID").getTextContent());
	    vo.setSignedMsg(getElementByName(infoEle,"SIGNED_MSG").getTextContent());
	    
	    Element bodyEle = getElementByName(rootEle, "BODY");
	    vo.setPartnerTradeNo(getElementByName(bodyEle,"PARTNER_TRADE_NO").getTextContent());
	    
	    vo.setQueryTime(df.parse(getElementByName(bodyEle,"QUERY_TIME").getTextContent()));
	    vo.setRetCode(getElementByName(bodyEle,"RET_CODE").getTextContent());
	    vo.setRetMsg(getElementByName(bodyEle,"RET_MSG").getTextContent());
	    vo.setQueryRemark(getElementByName(bodyEle,"QUERY_REMARK").getTextContent());
	    
	    return vo;
    }
    
    private Element getDocumentElement(String xml) throws Exception{
    	DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance(); 
    	DocumentBuilder db = dbf.newDocumentBuilder();
    	
    	byte[] bytes = xml.getBytes("UTF-8");
	    InputStream inps = new ByteArrayInputStream(bytes);
    	
	    Document doc = db.parse(inps);
	    Element rootEle = doc.getDocumentElement(); 
	    
	    if("AIPAYTRADE".equalsIgnoreCase(rootEle.getNodeName()) == false){
	    	throw new Exception("报文错误,根节点不是:AIPAYTRADE");
	    }
	    
	    inps.close();
	    
	    return rootEle;
    }
    
    private Element getElementByName(Element pEle,String name) throws Exception{
    	NodeList list = pEle.getElementsByTagName(name);
    	if(list != null && list.getLength() == 1){
    		return (Element)list.item(0);
    	}else{
    		throw new Exception("报文错误，没有"+name+"节点或节点错误");
    	}
    }
}
