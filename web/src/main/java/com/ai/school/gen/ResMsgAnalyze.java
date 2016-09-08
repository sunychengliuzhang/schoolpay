package com.ai.school.gen;

import com.ai.paas.client.security.SignatureUtil;


public class ResMsgAnalyze extends XmlAnalyze{
	
private SignatureUtil signature;
	
	public ResMsgAnalyze(SignatureUtil signature){
		this.signature = signature;
	}
	

	private boolean verifySign(String resMsg){
		try{
			int signBegin = resMsg.indexOf("<SIGNED_MSG>");
			int signEnd = resMsg.indexOf("</SIGNED_MSG>");
			
			String sign = resMsg.substring(signBegin + "<SIGNED_MSG>".length(), signEnd);
			String plainText = resMsg.substring(0,signBegin+"<SIGNED_MSG>".length()) + resMsg.substring(signEnd);
			
			return signature.verifySignature(sign, plainText);
			
		}catch(Exception e){
			System.out.println("验证签名失败：" + e.getMessage());
			return false;
		}
	}
}
