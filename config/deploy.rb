CURRENT_DIR = File.dirname(__FILE__)
require "#{CURRENT_DIR}/client_helper"

namespace :code do
	desc "Minimize JavaScript"
	task :minimize do
  		file_content = run_locally "cat #{CURRENT_DIR}/../example/index.php\n"

  		js_links = ClientHelper.js_links(
  			file_content, 
  			"#{CURRENT_DIR}/../example/", 
  			["jquery"]
  		).join " "

  		js_out_file = "#{CURRENT_DIR}/../example/js/carousel-min.js"

  		run_locally "java -Xms64m -Xmx128m -jar /opt/compiler.jar --js #{js_links} --js_output_file #{js_out_file}"
  		run_locally "ln -sf #{CURRENT_DIR}/../index.php #{CURRENT_DIR}/../index-prod.php"
	end
end