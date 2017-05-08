module GraphHelpers
  module Example
    def resolver_for(name)
      subject.fields[name.to_s].resolve_proc
    end

    def underlying_resolver_for(name)
      resolver_for(name).instance_variable_get('@underlying_resolve')
    end

    def field(name)
      resolver_for(name).call(model, nil, nil)
    end

    def connection(name)
      underlying_resolver_for(name).call(model, nil, nil)
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
