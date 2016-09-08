package com.ai.school.gen;


import com.ai.paas.client.utils.SignatureTools;
import com.ai.school.pay.SignPayVo;

/**
 * 请求报文生成器
 * @author xiongqian
 *
 */
public class ReqMsgGenerate extends XmlGenerate{
	

	
	/**
	 * 根据支付请求信息生成支付请求XML
	 * @param payVo 支付请求信息
	 * @return 签名后的支付请求报文
	 * @throws Exception
	 */
    public String generatePayMsg(SignPayVo payVo) throws Exception{
    	
    	//构造请求XMl
    	String payXmlSource = this.getPayXml(payVo);
    	String pfxFile = ReqMsgGenerate.class.getClassLoader().getResource("test_private_key.pfx").getFile();
		String pfxPwd = "aipay123456"; //私钥库密码,请修改成自己的密码
		String privateKeyPwd = "aipay654321";//私钥密码，请修改成自己的密码
		//签名
		String singXMLRequest = SignatureTools.sign(payXmlSource, pfxFile, pfxPwd, privateKeyPwd);
    	
    	//返回签名后的支付请求报文
    	return payXmlSource.replaceAll("<SIGNED_MSG></SIGNED_MSG>", "<SIGNED_MSG>"+singXMLRequest+"</SIGNED_MSG>");
    }
    

}

