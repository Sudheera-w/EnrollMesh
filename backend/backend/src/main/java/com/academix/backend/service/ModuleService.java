package com.academix.backend.service;

import com.academix.backend.entity.Module;
import java.util.List;

public interface ModuleService {
    List<Module> getAllModules();
    Module getModuleById(Long id);
    Module createModule(Module module);
    Module updateModule(Long id, Module module);
    void deleteModule(Long id);
}
