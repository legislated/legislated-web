# monkey patch pg_search to allow eager loads again. otherwise a query
# that sorts by hearing date fails
# see: https://github.com/Casecommons/pg_search/issues/330
module PgSearch
  class ScopeOptions
    module DisableEagerLoading
      def eager_loading?
        true
      end
    end
  end
end
