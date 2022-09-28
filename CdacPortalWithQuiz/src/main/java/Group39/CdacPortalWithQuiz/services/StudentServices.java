package Group39.CdacPortalWithQuiz.services;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import Group39.CdacPortalWithQuiz.DTO.OptionsDTO;
import Group39.CdacPortalWithQuiz.DTO.QuestionListDTO;
import Group39.CdacPortalWithQuiz.DTO.ShowSubjectsDTO;
import Group39.CdacPortalWithQuiz.models.Notices;
import Group39.CdacPortalWithQuiz.models.Options;
import Group39.CdacPortalWithQuiz.models.Question;
import Group39.CdacPortalWithQuiz.models.ScoreDetails;
import Group39.CdacPortalWithQuiz.models.Subject;
import Group39.CdacPortalWithQuiz.models.User;
import Group39.CdacPortalWithQuiz.repository.StudentRepository;
import Group39.CdacPortalWithQuiz.repository.UserRepository;

@Service
public class StudentServices {
	@Autowired
	StudentRepository stdrepo;
	@Autowired
	UserRepository userrepo;
	@Autowired

	public List <ShowSubjectsDTO> showSubjects()
	{
		List<Subject> subList = stdrepo.getSubjectList();
		List<ShowSubjectsDTO> subDtoList = new ArrayList<ShowSubjectsDTO>();
		for(Subject sub : subList)
		{
			ShowSubjectsDTO subdto= new ShowSubjectsDTO();
			subdto.setDate(sub.getDate());
			subdto.setFacname(sub.getUser().getName());
			subdto.setQuizId(sub.getQuizId());
			subdto.setSubject(sub.getSubject());
			subDtoList.add(subdto);
		}
		return subDtoList;
	}
	
	public List<QuestionListDTO> getQuestionList(int id)
	{
		List<Question> listQuestion = stdrepo.getQuiz(id);
		List<QuestionListDTO> questionList = new ArrayList<QuestionListDTO>();
		for(Question question : listQuestion)
		{
			QuestionListDTO quest = new QuestionListDTO();
			quest.setId(id);
			quest.setQuizId(question.getQuizId().getQuizId());
			quest.setQuestion(question.getQuestion());
			List<OptionsDTO> listOptDto = new ArrayList<OptionsDTO>();
			for(Options option : question.getOptions() )
			{
				OptionsDTO opt = new OptionsDTO();
				opt.setOptionString(option.getOptionString());
				opt.setQue_id(question.getId());
				opt.setCorrect(option.isCorrect());
				listOptDto.add(opt);
			}
			quest.setOptions(listOptDto);
		  questionList.add(quest);
		}
		return questionList;
	}

	public boolean addScore(int userid, int quizid, int score) {
		
		User u1 =  userrepo.getUserById(userid);
	    Subject sub = stdrepo.geSubject(quizid);
		ScoreDetails scoredet = new ScoreDetails();
		scoredet.setDate(LocalDate.now());
		scoredet.setQuizId(sub);
		scoredet.setScore(score);
		scoredet.setUserID(u1);
		return stdrepo.addScore(scoredet);
	}
	
	public List<Notices> displayNotice()
	{
		List<Notices> noticeList = stdrepo.getNotices();
		return noticeList;
	}

}
