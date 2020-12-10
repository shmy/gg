package com.example.account.repository;
import com.example.account.entity.{{pascalize(tableName)}}Entity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface {{pascalize(tableName)}}Repository extends JpaRepository<{{pascalize(tableName)}}Entity, {{primaryKeyType}}> {
{{--
  @each(field in fields)
  @if(!field.isPrimaryKey)
    {{pascalize(tableName)}}Entity update{{pascalize(field.field)}}ById({{primaryKeyType}} id, {{field.type}} value);
  @endif
  @endeach
--}}
}
