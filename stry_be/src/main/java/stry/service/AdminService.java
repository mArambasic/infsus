package stry.service;

import stry.model.User;
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
    public List<User> getAllPlayers() {
        List<User> allPlayers = adminRepository.getAllPlayers();
        List<User> retVal = new ArrayList<>();
        for (User k : allPlayers) {
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
    public List<User> getAllUnconfirmedCartographers() {
        return adminRepository.getAllUnconfirmedCartographers();
    }

    @Override
    public void confirmKartograf(String username) {
        adminRepository.confirmKartograf(username);
    }
}
