package Group39.CdacPortalWithQuiz.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;

import javax.imageio.ImageIO;
import javax.mail.internet.AddressException;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.xml.bind.DatatypeConverter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;


import Group39.CdacPortalWithQuiz.DTO.LoginStatusDto;
import Group39.CdacPortalWithQuiz.DTO.ProfilePicDTO;
import Group39.CdacPortalWithQuiz.models.User;
import Group39.CdacPortalWithQuiz.repository.UserRepository;
@Service
public class UserServicesImpl {
	
	@Autowired
	UserRepository userrepo;
	@Autowired
	MailService mail;
	@Autowired
	OtpGenerator otpgen;
	MessageDigest md;
	
	public boolean registerService(User u1)
	{
		String normalPsw = u1.getPassword();
		try {
		md=MessageDigest.getInstance("MD5");
		}
		catch (Exception e) {
			// TODO: handle exception
		}
		md.update(u1.getPassword().getBytes());
		byte[] hashpsw =md.digest();
		String psw = DatatypeConverter.printHexBinary(hashpsw).toUpperCase();
		u1.setPassword(psw);
		boolean status = userrepo.registerUser(u1);
		if(status)
		{
			mail.sendSimpleMessage(u1.getEmail(),normalPsw);
			return true;
		}
		return false;	
	}
	
	public LoginStatusDto loginService(String email, String password)
	{
		try {
			md=MessageDigest.getInstance("MD5");
			}
			catch (Exception e) {
	
			}
		md.update(password.getBytes());
		byte[] psw = md.digest();
		String hashpsw = DatatypeConverter.printHexBinary(psw).toUpperCase();
		return userrepo.loginVerify(email,hashpsw);
		
	}
	

	public boolean passwordUpdateService(String email, String password)
	{
		try {
			md=MessageDigest.getInstance("MD5");
			}
			catch (Exception e) {
				// TODO: handle exception
			}
		md.update(password.getBytes());
		byte[] psw = md.digest();
		String hashpsw = DatatypeConverter.printHexBinary(psw).toUpperCase();
		userrepo.updatePassword(email,hashpsw);
		return true;
	}
	
	public boolean sendOtp(String email)
	{
		String otp=otpgen.otpGen();
		if(userrepo.checkUserExist(email))
		{
			try {
			mail.sendSimpleMessage1(email,otp);
			}
			catch(Exception e)
			{
				return false;
			}
			return true;
		}
		else
			return false;
		
	}
	

}
 





