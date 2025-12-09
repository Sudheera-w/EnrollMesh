package com.academix.backend.service.impl;

import com.academix.backend.entity.Module;
import com.academix.backend.repository.ModuleRepository;
import com.academix.backend.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    @Override
    public Module getModuleById(Long id) {
        return moduleRepository.findById(id).orElse(null);
    }

    @Override
    public Module createModule(Module module) {
        return moduleRepository.save(module);
    }

    @Override
    public Module updateModule(Long id, Module module) {
        Module existing = moduleRepository.findById(id).orElse(null);
        if (existing==null){
            return null;
        }
        existing.setName(module.getName());
        existing.setCode(module.getCode());
        existing.setCredits(module.getCredits());
        existing.setDepartment(module.getDepartment());
        return moduleRepository.save(existing);
    }

    @Override
    public void deleteModule(Long id) {
        moduleRepository.deleteById(id);
    }
}
