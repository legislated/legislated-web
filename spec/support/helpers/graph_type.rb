module Helpers
  module GraphType
    extend ActiveSupport::Concern

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

    class_methods do
      def it_maps_fields(field_map)
        it "maps the fields correctly" do
          expect(subject).to map_fields(field_map)
        end
      end
    end
  end
end

RSpec.configuration.include(Helpers::GraphType, :graph_type)
