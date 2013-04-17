CURRENT_DIR = File.dirname(__FILE__)
require "#{CURRENT_DIR}/client_helper"

namespace :code do
	desc "Minimize JavaScript"
	task :minimize do
		file_content = run_locally "cat #{CURRENT_DIR}/../index.php\n"

		js_links = ClientHelper.js_links(
			file_content, 
			"#{CURRENT_DIR}/../", 
			["jquery"]
		).join " "

		js_out_file = "#{CURRENT_DIR}/../js/carousel-min.js"

		run_locally "java -Xms64m -Xmx128m -jar /opt/compiler.jar --js #{js_links} --js_output_file #{js_out_file}"
		run_locally "ln -sf #{CURRENT_DIR}/../index.php #{CURRENT_DIR}/../index-prod.php"
	end
end

set :application, "carousel.jquery"
set :scm, :git
set :repository, 'git@github.com:IQ-RIA/jquery-carousel.git'

role :web, "10.80.80.72"                          # Your HTTP server, Apache/etc
role :app, "10.80.80.72"                          # This may be the same as your `Web` server
role :db,  "10.80.80.72", :primary => true # This is where Rails migrations will run

set :user, 'demo'
set :keep_releases, 2
set :use_sudo, false
set :deploy_via, :remote_cache
set :deploy_to, "/var/www/html/#{application}.demo.iqria.com"

set :default_run_options, { :shell => '/bin/bash', :pty => true }
set :ssh_options, {
    :keys => [
        File.join(ENV["HOME"], '.ssh', 'iqria_demo')
    ]
}

namespace :deploy do

  task :permissions do ; end

  task :run_migrations do ; end

  task :migrate do ; end

  desc "Use sudo"
  task :use_sudo do
      unless exists? :password_entered
          set(:password) { Capistrano::CLI.password_prompt("Root password: ") }
          set :use_sudo, true
          set :password_entered, true
      end
  end

  desc <<-DESC
    task is used only in deploy:setup
    deploy:setup should be runned with root-access
    as result the owner of #{deploy_to}-folder will be root
    this task changes this issue to setup valid-rights for #{deploy_to}-folder 
  DESC
  task :fix_setup_permissions do
      run "#{try_sudo} chown #{user}:#{user} -R #{deploy_to}"
      run "#{try_sudo} chmod 755 #{deploy_to}"
  end

  task :apply_db_dump do
    set(:database_user) { Capistrano::CLI.password_prompt("Database username: ") }
    set(:database_password) { Capistrano::CLI.password_prompt("Database password: ") }
    set(:database_name) { Capistrano::CLI.password_prompt("Database name: ") }
    
    run "mysql -u#{database_user} -p#{database_password} #{database_name} < #{latest_release}/data/ts.sql"
  end

  task :apply_shared_folders do ; end
end

before "deploy:setup", "deploy:use_sudo"
after  "deploy:setup", "deploy:fix_setup_permissions"

before "deploy:start", "deploy:permissions"
before "deploy:start", "deploy:apply_db_dump"
before "deploy:start", "deploy:run_migrations"

before "deploy:restart", "deploy:permissions"
before "deploy:restart", "deploy:run_migrations"

after  "deploy:restart", "deploy:cleanup"
after  "deploy:create_symlink", "deploy:apply_shared_folders"