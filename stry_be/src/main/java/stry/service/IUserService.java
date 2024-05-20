package stry.service;

import stry.POJOs.FullPlayerProfilePOJO;
import stry.model.User;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> findAll();

    User addNewUser(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;

    String checkCredentials(String username, String password);

    Optional<User> findByUsername(String username);


    public void saveChanges(User user);

    FullPlayerProfilePOJO getOtherProfile(String username) throws IOException;
}
