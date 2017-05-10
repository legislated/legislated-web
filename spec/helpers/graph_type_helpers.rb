module GraphTypeHelpers
  module Example
    def resolver_for(name)
      subject.fields[name.to_s].resolve_proc
    end

    def field(name, object: model, args: {}, context: nil)
      resolver_for(name).call(object, args, context)
    end

    def connection(name, object: model, args: {}, context: nil)
      handler = resolver_for(name).instance_variable_get('@underlying_resolve')
      handler.call(object, args, context)
    end

    def mutate(object: nil, args: {}, context: nil)
      handler = subject.field.resolve_proc.instance_variable_get('@resolve')
      handler.call(object, args, context)
    end
  end

  module Group
    def it_maps_fields(field_map)
      it 'maps the fields correctly' do
        field_map.each do |key, graph_key|
          expect(field(graph_key)).to eq(model.send(key)), "expected #{key} to map to #{graph_key}"
        end
      end
    end
  end
end
