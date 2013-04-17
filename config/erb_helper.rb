require 'erb'

def apply_template(name, title)
  def get param_name
    Capistrano::CLI.ui.ask "#{param_name.to_s}: "
  end

  valid = false
  while not valid
    current_directory = File.dirname(__FILE__)
    content = IO.read("#{current_directory}/template/#{name}.php.erb")
    tpl = ERB.new content
    puts title
    result = tpl.result(binding)
    valid = Capistrano::CLI.ui.ask('Is your input valid: Y/N').downcase == 'y'
  end

  result
end
