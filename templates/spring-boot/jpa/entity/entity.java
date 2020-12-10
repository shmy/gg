package com.example.account.entity;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import javax.persistence.*;

@Entity
@Table(name = "{{tableName}}")
@DynamicUpdate
@DynamicInsert
@Data
public class {{pascalize(tableName)}} {
@each(field in fields)
@if(field.isPrimaryKey)
  @Id
@if(field.isAutoIncrement)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
@endif
@endif
  @Column(name = "{{field.field}}")
  private {{field.type}} {{camelize(field.field)}};
@endeach
}
