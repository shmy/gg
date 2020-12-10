package com.example.account.service;
import com.example.account.entity.{{pascalize(tableName)}}Entity;
import com.example.account.repository.{{pascalize(tableName)}}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class {{pascalize(tableName)}}Service {
  @Autowired
  private {{pascalize(tableName)}}Repository {{camelize(tableName)}}Repository;

  public List<{{pascalize(tableName)}}Entity> lookup() {
    return this.{{camelize(tableName)}}Repository.findAll();
  }
  public {{pascalize(tableName)}}Entity detail({{primaryKeyType}} id) {
    Optional<{{pascalize(tableName)}}Entity> {{camelize(tableName)}} = this.{{camelize(tableName)}}Repository.findById(id);
    return {{camelize(tableName)}}.orElse(null);
  }
  public {{pascalize(tableName)}}Entity create({{pascalize(tableName)}}Entity body) {
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public {{pascalize(tableName)}}Entity update(Integer id, {{pascalize(tableName)}}Entity body) {
    Optional<{{pascalize(tableName)}}Entity> {{camelize(tableName)}}Entity = this.{{camelize(tableName)}}Repository.findById(id);
    if (!{{camelize(tableName)}}Entity.isPresent()) {
      return null;
    }
    body.setId(id);
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public void delete(Integer id) {
    Optional<{{pascalize(tableName)}}Entity> {{camelize(tableName)}}Entity = this.{{camelize(tableName)}}Repository.findById(id);
    if ({{camelize(tableName)}}Entity.isPresent()) {
      this.{{camelize(tableName)}}Repository.deleteById(id);
    }
  }
@each(field in fields)
@unless(field.isPrimaryKey)
  public {{field.type}} update{{pascalize(field.field)}}ById({{primaryKeyType}} id, {{field.type}} value) {
    Optional<{{pascalize(tableName)}}Entity> {{camelize(tableName)}}EntityOptional = this.{{camelize(tableName)}}Repository.findById(id);
    if (!{{camelize(tableName)}}EntityOptional.isPresent()) {
      return null;
    }
    {{pascalize(tableName)}}Entity {{camelize(tableName)}}Entity = {{camelize(tableName)}}EntityOptional.get();
    {{camelize(tableName)}}Entity.{{camelize('set_' + field.field)}}(value);
    return this.{{camelize(tableName)}}Repository.save({{camelize(tableName)}}Entity).{{camelize('get_' + field.field)}}();
  }
@endunless
@endeach
}
