require "#{File.dirname(__FILE__)}/client_helper"

namespace :code do
	desc "Minimize JavaScript"
	task :minimize do
		current_folder = File.dirname(__FILE__)

  		file_content = run_locally "cat #{current_folder}/../example/index.php\n"

  		js_links = ClientHelper.js_links(file_content, "#{current_folder}/../example/").join " "
  		js_out_file = "#{current_folder}/../example/js/carousel-min.js"

  		run_locally "java -Xms64m -Xmx128m -jar /opt/compiler.jar --js #{js_links} --js_output_file #{js_out_file}"
  		run_locally "ln -sf #{current_folder}/../index.php #{current_folder}/../index-prod.php"
	end
end