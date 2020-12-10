package com.example.demo.controller;

import com.example.demo.entity.{{pascalize(tableName)}}Entity;
import com.example.demo.service.{{pascalize(tableName)}}Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/{{camelize(tableName)}}")
public class {{pascalize(tableName)}}Controller {
  @Autowired {{pascalize(tableName)}}Service {{camelize(tableName)}}Service;
  @GetMapping("")
  public List<{{pascalize(tableName)}}Entity> lookup() {
    return this.{{camelize(tableName)}}Service.lookup();
  }
  @GetMapping("{id}")
  public {{pascalize(tableName)}}Entity detail(@PathVariable {{primaryKeyType}} id) throws Exception {
    return this.{{camelize(tableName)}}Service.detail(id);
  }
  @PostMapping("")
  public {{pascalize(tableName)}}Entity create(@RequestBody {{pascalize(tableName)}}Entity body) {
    return this.{{camelize(tableName)}}Service.create(body);
  }
  @PutMapping("{id}")
  public {{pascalize(tableName)}}Entity update(@PathVariable {{primaryKeyType}} id, @RequestBody {{pascalize(tableName)}}Entity body) throws Exception {
    return this.{{camelize(tableName)}}Service.update(id, body);
  }
  @DeleteMapping("{id}")
  public Object delete(@PathVariable {{primaryKeyType}} id) throws Exception {
    this.{{camelize(tableName)}}Service.delete(id);
    return null;
  }
@each(field in fields)
@unless(field.isPrimaryKey)
  @PatchMapping("{id}/update{{pascalize(field.field)}}ById")
  public {{field.type}} update{{pascalize(field.field)}}ById(@PathVariable {{primaryKeyType}} id, @RequestBody {{field.type}} value) throws Exception {
    return this.{{camelize(tableName)}}Service.update{{pascalize(field.field)}}ById(id, value);
  }
@endunless
@endeach
}
