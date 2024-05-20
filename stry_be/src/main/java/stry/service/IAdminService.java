package stry.service;

import stry.model.Korisnik;

import java.util.List;

public interface IAdminService {

    List<Korisnik> getAllPlayers();

    void deletePlayers(String username);

    void updatePlayers(String username, boolean banned);

    List<Korisnik> getAllUnconfirmedCartographers();

    void confirmKartograf(String username);

}
