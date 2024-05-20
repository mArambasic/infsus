package stry.service;

import stry.model.User;

import java.util.List;

public interface IAdminService {

    List<User> getAllPlayers();

    void deletePlayers(String username);

    List<User> getAllUnconfirmedCartographers();

    void confirmKartograf(String username);

}
