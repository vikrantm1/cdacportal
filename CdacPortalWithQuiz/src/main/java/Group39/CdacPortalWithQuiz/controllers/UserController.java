package Group39.CdacPortalWithQuiz.controllers;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;


import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.mongo.MongoProperties.Gridfs;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.data.util.StreamUtils;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;

import Group39.CdacPortalWithQuiz.DTO.LoginStatusDto;
import Group39.CdacPortalWithQuiz.DTO.ProfilePicDTO;
import Group39.CdacPortalWithQuiz.models.User;
import Group39.CdacPortalWithQuiz.models.mongoVideo;
import Group39.CdacPortalWithQuiz.models.studymaterial;
import Group39.CdacPortalWithQuiz.repository.UserRepository;
import Group39.CdacPortalWithQuiz.services.MailService;
import Group39.CdacPortalWithQuiz.services.OtpGenerator;
import Group39.CdacPortalWithQuiz.services.UserServicesImpl;

@CrossOrigin
@RestController
public class UserController {

	@Autowired
	UserServicesImpl uservice;
	@Autowired
	OtpGenerator op1;
	//////////////
	@Autowired
	GridFsTemplate gridfs;
	@Autowired
	GridFsOperations gridop;
	///////

	
	@PostMapping("/register")
	public boolean registerUser(@RequestBody User user)
	{
		boolean status = uservice.registerService(user);
		return status;
	}
	
	@PostMapping("/login")
	public LoginStatusDto loginUser(@RequestParam String email,String password)
	{
		return uservice.loginService(email, password);
	}
	
	@PostMapping("/ForgetPasswordGenerateOtp")
	public boolean generateOtp(@RequestParam String email)
	{
		
		if(uservice.sendOtp(email))
		{
		return true;
		}
	
			return false;
	
	}
	
	@PostMapping("/verifyOtp")
	public boolean verifyOtp(@RequestParam String otp)
	{
		
		if(op1.verifyOtp(otp))
		{
		   return true;
		}
		return false;
	}
	
	@PostMapping("/updatePassword")
	public boolean updatePassword(@RequestParam String newPassword,@RequestParam String email )
	{
		
		uservice.passwordUpdateService(email, newPassword);
	    return true;
	}
	
}
