package stry.service;

import stry.POJOs.FullPlayerProfilePOJO;
import stry.model.Korisnik;

import javax.mail.MessagingException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<Korisnik> findAll();

    Korisnik addNewUser(Korisnik user, String siteURL) throws MessagingException, UnsupportedEncodingException;

    String checkCredentials(String username, String password);

    Optional<Korisnik> findByUsername(String username);


    public void saveChanges(Korisnik user);

    FullPlayerProfilePOJO getOtherProfile(String username) throws IOException;
}
