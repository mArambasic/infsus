package stry.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import stry.POJOs.FullPlayerProfilePOJO;
import stry.exceptions.NotEnoughParametersException;
import stry.exceptions.UserAlreadyExistsException;
import stry.exceptions.UserNotFoundException;
import stry.model.User;
import stry.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;

@RestController
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/v1/allUsers")
    public String login(@RequestBody User user) {
        if (user.getUsername() == null ||
                user.getPassword() == null) {
            throw new NotEnoughParametersException("no no");
        }
        String res = userService.checkCredentials(user.getUsername(), user.getPassword());
        Optional<User> k = userService.findByUsername(user.getUsername());
        if (res.equals("fail")) {
            throw new UserNotFoundException("Pogresno korisnicko ime ili lozinka");
        }
        System.out.println(k.get().getRole());
        return k.get().getRole();
    }

    @PostMapping("api/v1/addNewPlayer") // http://localhost:8080/api/v1/addNewPlayer
    public void addNewPlayer(@RequestBody User user, HttpServletRequest request) {
        String siteURL = getSiteUrl(request);
        try {
            if (user.getUsername() == null ||
                    user.getPassword() == null ||
                    user.getEmail() == null ||
                    user.getFirstName() == null ||
                    user.getLastName() == null
            ) {
                throw new NotEnoughParametersException("no no");
            }

            User newUser = new User(user.getUsername(),
                    user.getPassword(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName(),
                    user.getRole());
            var res = userService.addNewUser(newUser, siteURL);
            if (res == null) {
                throw new UserAlreadyExistsException("no-no");
            }
        } catch (Exception e) {
            throw new UserAlreadyExistsException("no-no");
        }
    }

    private String getSiteUrl(HttpServletRequest request) {
        String siteURL = request.getRequestURL().toString();
        return siteURL.replace(request.getServletPath(), "");
    }

    @PostMapping("api/v1/profileChangeSaved")
    public void saveChanges(@RequestBody User user) {
        Optional<User> k = userService.findByUsername(user.getUsername());

        k.get().setPassword(user.getPassword());

        userService.saveChanges(k.get());
    }

    @PostMapping("/api/v1/getOtherProfile")
    public FullPlayerProfilePOJO getOtherProfile(@RequestBody User user) throws IOException {
        FullPlayerProfilePOJO retVal = userService.getOtherProfile(user.getUsername());
        return retVal;
    }
}
