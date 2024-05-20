package stry.service;

import stry.model.Korisnik;
import stry.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;

    public AdminService() {};

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @Override
    public List<Korisnik> getAllPlayers() {
        List<Korisnik> allPlayers = adminRepository.getAllPlayers();
        List<Korisnik> retVal = new ArrayList<>();
        for (Korisnik k : allPlayers) {
            if (!k.getRole().equals("Admin"))
                retVal.add(k);
        }
        return retVal;
    }

    @Override
    public void deletePlayers(String username) {
        adminRepository.deletePlayers(username);
    }

    @Override
    public void updatePlayers(String username, boolean banned) {
        adminRepository.updatePlayers(username, banned);
    }

    @Override
    public List<Korisnik> getAllUnconfirmedCartographers() {
        return adminRepository.getAllUnconfirmedCartographers();
    }

    @Override
    public void confirmKartograf(String username) {
        adminRepository.confirmKartograf(username);
    }
}
