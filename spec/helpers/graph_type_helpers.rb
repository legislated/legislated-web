module GraphTypeHelpers
  RSpec::Matchers.define :map_fields do |field_map|
    match do |actual|
      field_map.all? do |key, graph_key|
        field = actual.fields[graph_key]
        field.present? && (field.property == key || field.hash_key == key)
      end
    end
  end

  module Example
    def field_for(name)
      subject.fields[name.to_s]
    end

    def field_type_for(name)
      field_for(name).type
    end

    def field_resolver_for(name)
      field_for(name).resolve_proc
    end

    def resolve_field(name, obj: nil, args: nil, ctx: nil)
      field_resolver_for(name).call(obj, args, ctx)
    end

    def mutate(obj: nil, args: {}, ctx: nil)
      handler = subject.field.resolve_proc
      handler.call(obj, args, ctx)
    end
  end

  module Group
    def it_maps_fields(field_map)
      it "maps the fields correctly" do
        expect(subject).to map_fields(field_map)
      end
    end
  end
end

RSpec.configuration.extend GraphTypeHelpers::Group, graphql: :type
RSpec.configuration.include GraphTypeHelpers::Example, graphql: :type
