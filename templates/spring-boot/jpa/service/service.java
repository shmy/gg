package com.example.account.service;
import com.example.account.entity.{{pascalize(tableName)}};
import com.example.account.repository.{{pascalize(tableName)}}Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class {{pascalize(tableName)}}Service {
  @Autowired
  private {{pascalize(tableName)}}Repository {{camelize(tableName)}}Repository;

  public List<{{pascalize(tableName)}}> lookup() {
    return this.{{camelize(tableName)}}Repository.findAll();
  }
  public {{pascalize(tableName)}} detail({{primaryKeyType}} id) {
    Optional<{{pascalize(tableName)}}> {{camelize(tableName)}} = this.{{camelize(tableName)}}Repository.findById(id);
    return {{camelize(tableName)}}.orElse(null);
  }
  public {{pascalize(tableName)}} create({{pascalize(tableName)}} body) {
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public {{pascalize(tableName)}} update(Integer id, {{pascalize(tableName)}} body) {
    Optional<{{pascalize(tableName)}}> {{camelize(tableName)}} = this.{{camelize(tableName)}}Repository.findById(id);
    if (!{{camelize(tableName)}}.isPresent()) {
      return null;
    }
    body.setId(id);
    return this.{{camelize(tableName)}}Repository.save(body);
  }
  public void delete(Integer id) {
    Optional<{{pascalize(tableName)}}> {{camelize(tableName)}} = this.{{camelize(tableName)}}Repository.findById(id);
    if ({{camelize(tableName)}}.isPresent()) {
      this.{{camelize(tableName)}}Repository.deleteById(id);
    }
  }
@each(field in fields)
@unless(field.isPrimaryKey)
  public {{field.type}} update{{pascalize(field.field)}}ById({{primaryKeyType}} id, {{field.type}} value) {
    Optional<{{pascalize(tableName)}}> {{camelize(tableName)}}Optional = this.{{camelize(tableName)}}Repository.findById(id);
    if (!{{camelize(tableName)}}Optional.isPresent()) {
      return null;
    }
    {{pascalize(tableName)}} {{camelize(tableName)}} = {{camelize(tableName)}}Optional.get();
    {{camelize(tableName)}}.{{camelize('set_' + field.field)}}(value);
    return this.{{camelize(tableName)}}Repository.save({{camelize(tableName)}}).{{camelize('get_' + field.field)}}();
  }
@endunless
@endeach
}
