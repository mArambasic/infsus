package stry.service;

import stry.model.Karta;

import java.util.List;
import java.util.UUID;

public interface IKartaService {
    List<Karta> findByUsername(String username);

    String collectCard(UUID cardId, String username);
}
