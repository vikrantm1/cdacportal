package Group39.CdacPortalWithQuiz.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.gridfs.model.GridFSFile;

import Group39.CdacPortalWithQuiz.DTO.QuestionListDTO;
import Group39.CdacPortalWithQuiz.DTO.RecordingDTO;
import Group39.CdacPortalWithQuiz.DTO.ShowScoreDTO;
import Group39.CdacPortalWithQuiz.DTO.ShowSubjectsDTO;
import Group39.CdacPortalWithQuiz.DTO.StudentDashboardDTO;
import Group39.CdacPortalWithQuiz.models.Notes;
import Group39.CdacPortalWithQuiz.models.Notices;
import Group39.CdacPortalWithQuiz.models.Question;
import Group39.CdacPortalWithQuiz.models.RecordingsManagement;
import Group39.CdacPortalWithQuiz.models.ScoreDetails;
import Group39.CdacPortalWithQuiz.models.Subject;
import Group39.CdacPortalWithQuiz.models.User;
import Group39.CdacPortalWithQuiz.models.mongoVideo;
import Group39.CdacPortalWithQuiz.repository.StudentRepository;
import Group39.CdacPortalWithQuiz.services.StudentServices;


@RestController
@CrossOrigin
@RequestMapping("/Student")
public class StudentController{

	@Autowired
	StudentRepository stdrepo;
	@Autowired
	StudentServices stdService;
	@Autowired
	GridFsTemplate gridfs;
	@Autowired
	GridFsOperations gridFsop;
	@PostMapping("/")
	public List<ScoreDetails> dashBoard(@RequestBody User student)
	{
		return stdrepo.dashBoard(student);
	}
	@GetMapping("/DisplaySubjects")
	public List<ShowSubjectsDTO> showSubList()
	{
		List <ShowSubjectsDTO> subList = stdService.showSubjects();
		return subList;
	}
	@PostMapping("/Notice")
 	public List<Notices> showNotices()
	{
		List<Notices> notice = stdrepo.getNoticeList();
		return notice;
	}
	@PostMapping("/AddScore")
	public boolean addScore(@RequestParam int userid, @RequestParam int quizid, @RequestParam int score)
	{
		boolean status = stdService.addScore(userid,quizid,score);
		return status;
	}
	@GetMapping("/getScore")
	public List<ShowScoreDTO> getScore(@RequestParam int id)
	{
		List<ShowScoreDTO>scoreList = stdrepo.getScores(id);
		return scoreList;
	}
	
	@GetMapping("/getQuestionList")
	public List<QuestionListDTO> getQuiz(@RequestParam int id)
	{
		List<QuestionListDTO> queList = stdService.getQuestionList(id);
		return queList;
	}
	@GetMapping("/getNotice")
	public List<Notices> getNotice()
	{
		return stdService.displayNotice();
	}
	@GetMapping("/videoView")
	public void getVideo(@RequestParam String id , HttpServletResponse response)throws Exception
	{
		GridFSFile file= gridfs.findOne(new Query(Criteria.where("_id").is(id)));  
		RecordingDTO recording = new RecordingDTO();
		recording.setStream(gridFsop.getResource(file).getInputStream());
		FileCopyUtils.copy(recording.getStream(),response.getOutputStream());
	}
	@GetMapping("VideoList")
	public List<RecordingsManagement> getVideoList()
	{
		List<RecordingsManagement> vidList =stdrepo.getVidList();
		return vidList;
	}
	@GetMapping("StudyList")
	public List<Notes> getNoteList()
	{
		List<Notes> noteList = stdrepo.getnoteList();
		return noteList;
	}
	@GetMapping("/notes.pdf")
	public void getNotes(@RequestParam String id , HttpServletResponse response)throws Exception
	{
		GridFSFile file= gridfs.findOne(new Query(Criteria.where("_id").is(id)));  
		RecordingDTO recording = new RecordingDTO();
		recording.setStream(gridFsop.getResource(file).getInputStream());
		FileCopyUtils.copy(recording.getStream(),response.getOutputStream());
	}
	
}
