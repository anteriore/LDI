package com.wyvernlabs.ldicp.spring.events.superadmin.web.users;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.wyvernlabs.ldicp.spring.events.superadmin.domain.Company;
import com.wyvernlabs.ldicp.spring.events.superadmin.domain.User;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.CompanyRepository;
import com.wyvernlabs.ldicp.spring.events.superadmin.repository.UserRepository;

@RestController
@RequestMapping("rest/users")
public class UserRestController {
    private static final Logger logger = LoggerFactory.getLogger(UserRestController.class);

    private UserRepository userRepository;
    private CompanyRepository companyRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserRestController(UserRepository userRepository, CompanyRepository companyRepository) {
        this.userRepository = userRepository;
        this.companyRepository = companyRepository;
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return userRepository.getOne(id);
    }

    @GetMapping()
    public List<User> list() {
        return userRepository.findAll();
    }

    @PostMapping()
    public User upsert(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @PostMapping("/permissions/")
    public User editPermissions(@RequestBody User newuser ) {
        User user = userRepository.getOne(newuser.getId());

        user.setPermissions(newuser.getPermissions());

        return userRepository.save(user);
 
    }

    @PostMapping("/password/")
    public User editPassword(@RequestBody User newuser ) {

        User user = userRepository.getOne(newuser.getId());
        user.setPassword(passwordEncoder.encode(newuser.getPassword()));
        return userRepository.save(user);
 
    }



    @GetMapping("/company/{id}")
    public List<User> listByCompany(@PathVariable Long id) {
        Company company = companyRepository.getOne(id);
        return userRepository.findByCompany(company);
    }

    @GetMapping("/activeusers/{id}")
    public List<User> listActive(@PathVariable boolean id) {
        //Company company = companyRepository.getOne(id);
        return userRepository.findByActive(id);
    }


}
