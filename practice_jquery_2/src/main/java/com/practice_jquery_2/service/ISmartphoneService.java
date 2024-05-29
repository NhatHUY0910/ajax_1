package com.practice_jquery_2.service;

import com.practice_jquery_2.model.Smartphone;

import java.util.Optional;

public interface ISmartphoneService {
    Iterable<Smartphone> findAll();

    Optional<Smartphone> findById(Long id);

    Smartphone save(Smartphone smartphone);

    void deleteById(Long id);
}
