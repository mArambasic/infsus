package stry.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stry.repository.BookCatalogRepository;
import stry.repository.PublishingHouseRepository;

@Service
public class PublishingHouseService implements IPublishingHouseService {
    @Autowired
    private PublishingHouseRepository publishingHouseRepository;

    public PublishingHouseService() {}

    public PublishingHouseService(PublishingHouseRepository publishingHouseRepository) {
        this.publishingHouseRepository = publishingHouseRepository;
    }
}
