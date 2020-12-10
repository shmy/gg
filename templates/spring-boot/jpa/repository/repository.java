package com.example.account.repository;
import com.example.account.entity.{{pascalize(tableName)}};
import org.springframework.data.jpa.repository.JpaRepository;

public interface {{pascalize(tableName)}}Repository extends JpaRepository<{{pascalize(tableName)}}, {{primaryKeyType}}> {
{{--
  @each(field in fields)
  @if(!field.isPrimaryKey)
    {{pascalize(tableName)}} update{{pascalize(field.field)}}ById({{primaryKeyType}} id, {{field.type}} value);
  @endif
  @endeach
--}}
}
