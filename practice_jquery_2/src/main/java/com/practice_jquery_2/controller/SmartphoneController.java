package com.practice_jquery_2.controller;

import com.practice_jquery_2.model.Smartphone;
import com.practice_jquery_2.service.ISmartphoneService;
import com.practice_jquery_2.service.SmartphoneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/smartphones")
public class SmartphoneController {

    @Autowired
    private ISmartphoneService smartphoneService;

    @GetMapping
    public ResponseEntity<Iterable<Smartphone>> listSmartphone() {
        return new ResponseEntity<>(smartphoneService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Smartphone> createSmartphone(@RequestBody Smartphone sm) {
        return new ResponseEntity<>(smartphoneService.save(sm), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Smartphone> updateSmartphone(@RequestBody Smartphone sm) {
        return new ResponseEntity<>(smartphoneService.save(sm), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Smartphone> deleteSmartphone(@PathVariable Long id) {
        Optional<Smartphone> sm = smartphoneService.findById(id);
        if (sm.isPresent()) {
            smartphoneService.deleteById(id);
            return new ResponseEntity<>(sm.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
