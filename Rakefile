require "bundler"
Bundler.setup

require "jasmine"

load 'jasmine/tasks/jasmine.rake'

task :default => "jasmine:ci"

desc "Build upper (without jQuery)"
task :build do
  require "sprockets"
  environment = Sprockets::Environment.new
  environment.append_path 'src'
  environment.append_path 'vendor'
  environment["stubs"].write_to("build/jquery.upper.js")
end
