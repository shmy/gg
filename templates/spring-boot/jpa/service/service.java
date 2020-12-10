package com.example.demo.service;
import com.example.demo.entity.{{pascalize(tableName)}}Entity;
import com.example.demo.repository.{{pascalize(tableName)}}Repository;
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
  public {{pascalize(tableName)}}Entity detail({{primaryKeyType}} id) throws Exception {
    Optional<{{pascalize(tableName)}}Entity> {{camelize(tableName)}} = this.{{camelize(tableName)}}Repository.findById(id);
    return {{camelize(tableName)}}.orElseThrow(Exception::new);
  }
  public {{pascalize(tableName)}}Entity create({{pascalize(tableName)}}Entity body) {
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public {{pascalize(tableName)}}Entity update({{primaryKeyType}} id, {{pascalize(tableName)}}Entity body) throws Exception {
    {{pascalize(tableName)}}Entity {{camelize(tableName)}}Entity = this.detail(id);
    body.setId({{camelize(tableName)}}Entity.{{camelize('get_' + primaryKeyField.field)}}());
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public void delete({{primaryKeyType}} id) throws Exception {
    {{pascalize(tableName)}}Entity {{camelize(tableName)}}Entity = this.detail(id);
    this.{{camelize(tableName)}}Repository.deleteById({{camelize(tableName)}}Entity.{{camelize('get_' + primaryKeyField.field)}}());
  }
@each(field in fields)
@unless(field.isPrimaryKey)
  public {{field.type}} update{{pascalize(field.field)}}ById({{primaryKeyType}} id, {{field.type}} value) throws Exception {
    {{pascalize(tableName)}}Entity {{camelize(tableName)}}Entity = this.detail(id);
    {{camelize(tableName)}}Entity.{{camelize('set_' + field.field)}}(value);
    return this.{{camelize(tableName)}}Repository.save({{camelize(tableName)}}Entity).{{camelize('get_' + field.field)}}();
  }
@endunless
@endeach
}
